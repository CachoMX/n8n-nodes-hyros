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
		url: `${credentials.baseUrl}${endpoint}`,
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
		throw new NodeApiError(this.getNode(), error);
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
	qs.page = 1;

	do {
		responseData = await hyrosApiRequest.call(this, method, endpoint, body, qs);

		if (Array.isArray(responseData)) {
			returnData.push(...responseData);
			if (responseData.length < (qs.pageSize as number)) {
				break;
			}
			qs.page = (qs.page as number) + 1;
		} else {
			returnData.push(responseData);
			break;
		}
	} while (true);

	return returnData;
}
