import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	JsonObject,
	NodeApiError,
} from 'n8n-workflow';

export async function hyrosApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
	// Escape hatch for endpoints served under a different version segment. The
	// v1.40 spec claims GET /domains lives under /api/v1/, but the live API
	// serves it at /api/v1.0/ and 404s the spec path (verified 2026-08-19), so
	// nothing passes this today.
	apiPath: string = '/api/v1.0',
): Promise<any> {
	const credentials = await this.getCredentials('hyrosApi');
	const baseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
	const apiKey = credentials.apiKey as string;
	// Agencies can act on a connected client account (API v1.40): optional on the credential.
	const accessibleAccountId = ((credentials.accessibleAccountId as string) || '').trim();
	const fullUrl = `${baseUrl}${apiPath}${endpoint}`;

	// Workaround: n8n httpRequest drops/corrupts headers on PUT with both body and qs.
	// Use native fetch to bypass n8n's request layer entirely for this case.
	// IMPORTANT: Build query string manually — URL.searchParams encodes @ to %40 which Hyros rejects.
	if (method === 'PUT' && Object.keys(body).length > 0 && Object.keys(qs).length > 0) {
		try {
			const queryString = Object.entries(qs).map(([k, v]) => `${k}=${v}`).join('&');
			const fetchHeaders: Record<string, string> = {
				'API-Key': apiKey,
				'Content-Type': 'application/json',
			};
			if (accessibleAccountId) {
				fetchHeaders['Accessible-Account-Id'] = accessibleAccountId;
			}
			const response = await fetch(`${fullUrl}?${queryString}`, {
				method: 'PUT',
				headers: fetchHeaders,
				body: JSON.stringify(body),
			});
			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`HTTP ${response.status}: ${errorText}`);
			}
			return assertNotErrorBody.call(this, await response.json());
		} catch (error) {
			if (error instanceof NodeApiError) {
				throw error;
			}
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
			...(accessibleAccountId ? { 'Accessible-Account-Id': accessibleAccountId } : {}),
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
		const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'hyrosApi', options);
		return assertNotErrorBody.call(this, responseData);
	} catch (error) {
		if (error instanceof NodeApiError) {
			throw error;
		}
		throw new NodeApiError(this.getNode(), error as any);
	}
}

/**
 * Hyros reports failures as `{ result: 'ERROR', message: [...] }`. Every error seen live comes
 * with a 4xx status, but Zapier and Make both hit responses where that body arrived with a 200
 * (HMCP-243), so a 200 carrying it is surfaced as a failure instead of passing as success.
 */
function assertNotErrorBody(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	responseData: unknown,
): unknown {
	const body = responseData as IDataObject | null;
	if (body && typeof body === 'object' && body.result === 'ERROR') {
		const messages = Array.isArray(body.message) ? body.message : [body.message];
		const text = messages.filter((m) => m !== undefined && m !== null).join('; ');
		throw new NodeApiError(this.getNode(), body as JsonObject, {
			message: text || 'The Hyros API returned an error',
		});
	}
	return responseData;
}

/**
 * tagsDate and leadStage.date reject fractional seconds ("Invalid date format.", verified live),
 * which is exactly what an expression like {{ $now.toISO() }} produces. Drop them, keep the rest.
 */
export function toSecondsPrecision(value: unknown): string {
	return String(value).replace(/(T\d{2}:\d{2}:\d{2})\.\d+/, '$1');
}

/** Split a comma-separated UI value into trimmed, non-empty entries. */
export function splitCsv(value: unknown): string[] {
	return String(value ?? '')
		.split(',')
		.map((entry) => entry.trim())
		.filter((entry) => entry.length > 0);
}

// GET /leads and GET /leads/aggregation take list filters as quoted, comma-separated values.
const quoteList = (values: string[]): string => values.map((v) => `"${v}"`).join(',');

/**
 * Query string for the lead search filters shared by GET /leads and GET /leads/aggregation.
 * Page ID is not part of it: /leads/aggregation rejects it as an unknown parameter.
 */
export function buildLeadSearchQs(filters: IDataObject): IDataObject {
	const qs: IDataObject = {};
	for (const key of ['emails', 'ids', 'tags', 'phones', 'stage']) {
		const values = splitCsv(filters[key]);
		if (values.length > 0) {
			qs[key] = quoteList(values);
		}
	}
	for (const key of ['tagFromDate', 'tagToDate', 'fromDate', 'toDate', 'updatedFromDate', 'updatedToDate']) {
		if (filters[key]) {
			qs[key] = filters[key];
		}
	}
	return qs;
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
