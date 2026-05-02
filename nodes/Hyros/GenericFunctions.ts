import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	NodeApiError,
} from 'n8n-workflow';

export async function hyrosApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any> {
	const credentials = await this.getCredentials('hyrosApi');
	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
	const apiKey = credentials.apiKey as string;
	const fullUrl = `${baseUrl}/api/v1.0${endpoint}`;

	// Workaround: n8n httpRequest drops/corrupts headers on PUT with both body and qs.
	// Use native fetch to bypass n8n's request layer entirely for this case.
	// IMPORTANT: Build query string manually — URL.searchParams encodes @ to %40 which Hyros rejects.
	if (method === 'PUT' && Object.keys(body).length > 0 && Object.keys(qs).length > 0) {
		try {
			const queryString = Object.entries(qs).map(([k, v]) => `${k}=${v}`).join('&');
			const response = await fetch(`${fullUrl}?${queryString}`, {
				method: 'PUT',
				headers: {
					'API-Key': apiKey,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`HTTP ${response.status}: ${errorText}`);
			}
			return await response.json();
		} catch (error) {
			throw new NodeApiError(this.getNode(), error as any);
		}
	}

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: fullUrl,
		headers: {
			'Content-Type': 'application/json',
		},
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'hyrosApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as any);
	}
}

export async function hyrosApiRequestAllItems(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<any[]> {
	const returnData: IDataObject[] = [];
	let responseData;

	qs.pageSize = 250; // Maximum page size

	do {
		responseData = await hyrosApiRequest.call(this, method, endpoint, body, qs);

		// Extract the result array from the response
		const items = (responseData as any).result || [];

		if (Array.isArray(items)) {
			returnData.push(...items);

			// Check if there's a next page
			const nextPageId = (responseData as any).nextPageId;
			if (nextPageId) {
				qs.pageId = nextPageId;
			} else {
				// No more pages
				break;
			}
		} else {
			// If result is not an array, push it and break
			returnData.push(items);
			break;
		}
	} while (true);

	return returnData;
}
