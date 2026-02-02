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

	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `${credentials.baseUrl}/api/v1.0${endpoint}`,
		headers: {
			'API-Key': credentials.apiKey as string,
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
		return await this.helpers.httpRequest(options);
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
