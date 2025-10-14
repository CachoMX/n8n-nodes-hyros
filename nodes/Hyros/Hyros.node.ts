import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

import {
	hyrosApiRequest,
	hyrosApiRequestAllItems,
} from './GenericFunctions';

import {
	leadOperations,
	leadFields,
} from './descriptions/LeadDescription';

import {
	salesOperations,
	salesFields,
} from './descriptions/SalesDescription';

import {
	orderOperations,
	orderFields,
} from './descriptions/OrderDescription';

import {
	callOperations,
	callFields,
} from './descriptions/CallDescription';

import {
	attributionOperations,
	attributionFields,
} from './descriptions/AttributionDescription';

import {
	productOperations,
	productFields,
} from './descriptions/ProductDescription';

import {
	tagOperations,
	tagFields,
} from './descriptions/TagDescription';

import {
	sourceOperations,
	sourceFields,
} from './descriptions/SourceDescription';

import {
	adOperations,
	adFields,
} from './descriptions/AdDescription';

import {
	customCostOperations,
	customCostFields,
} from './descriptions/CustomCostDescription';

import {
	clickOperations,
	clickFields,
} from './descriptions/ClickDescription';

import {
	cartOperations,
	cartFields,
} from './descriptions/CartDescription';

import {
	userInfoOperations,
	userInfoFields,
} from './descriptions/UserInfoDescription';

import {
	keywordOperations,
	keywordFields,
} from './descriptions/KeywordDescription';

import {
	subscriptionOperations,
	subscriptionFields,
} from './descriptions/SubscriptionDescription';

export class Hyros implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Hyros',
		name: 'hyros',
		icon: 'file:hyros.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Hyros API - Complete coverage of all endpoints',
		defaults: {
			name: 'Hyros',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'hyrosApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Ad',
						value: 'ad',
					},
					{
						name: 'Attribution',
						value: 'attribution',
					},
					{
						name: 'Call',
						value: 'call',
					},
					{
						name: 'Cart',
						value: 'cart',
					},
					{
						name: 'Click',
						value: 'click',
					},
					{
						name: 'Custom Cost',
						value: 'customCost',
					},
					{
						name: 'Keyword',
						value: 'keyword',
					},
					{
						name: 'Lead',
						value: 'lead',
					},
					{
						name: 'Order',
						value: 'order',
					},
					{
						name: 'Product',
						value: 'product',
					},
					{
						name: 'Sales',
						value: 'sales',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Subscription',
						value: 'subscription',
					},
					{
						name: 'Tag',
						value: 'tag',
					},
					{
						name: 'User Info',
						value: 'userInfo',
					},
				],
				default: 'lead',
			},
			// Lead
			...leadOperations,
			...leadFields,
			// Sales
			...salesOperations,
			...salesFields,
			// Order
			...orderOperations,
			...orderFields,
			// Call
			...callOperations,
			...callFields,
			// Attribution
			...attributionOperations,
			...attributionFields,
			// Product
			...productOperations,
			...productFields,
			// Tag
			...tagOperations,
			...tagFields,
			// Source
			...sourceOperations,
			...sourceFields,
			// Ad
			...adOperations,
			...adFields,
			// Custom Cost
			...customCostOperations,
			...customCostFields,
			// Click
			...clickOperations,
			...clickFields,
			// Cart
			...cartOperations,
			...cartFields,
			// User Info
			...userInfoOperations,
			...userInfoFields,
			// Keyword
			...keywordOperations,
			...keywordFields,
			// Subscription
			...subscriptionOperations,
			...subscriptionFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'lead') {
					// LEAD OPERATIONS
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const body: IDataObject = { email };

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/leads', body);
						returnData.push(responseData);

					} else if (operation === 'get') {
						const email = this.getNodeParameter('email', i) as string;
						const qs: IDataObject = {
							emails: `"${email}"`,
						};
						const responseData = await hyrosApiRequest.call(this, 'GET', '/leads', {}, qs);
						// API returns array, get first result
						if (Array.isArray(responseData) && responseData.length > 0) {
							returnData.push(responseData[0]);
						} else {
							returnData.push(responseData);
						}

					} else if (operation === 'getJourney') {
						const email = this.getNodeParameter('email', i) as string;
						// First get the lead ID by email
						const leadsQs: IDataObject = {
							emails: `"${email}"`,
						};
						const leadsData = await hyrosApiRequest.call(this, 'GET', '/leads', {}, leadsQs);

						if (Array.isArray(leadsData) && leadsData.length > 0 && leadsData[0].id) {
							const leadId = leadsData[0].id;
							const qs: IDataObject = {
								ids: `"${leadId}"`,
							};
							const responseData = await hyrosApiRequest.call(this, 'GET', '/leads/journey', {}, qs);
							returnData.push(responseData);
						} else {
							throw new NodeOperationError(this.getNode(), `Lead not found with email: ${email}`);
						}
					}

				} else if (resource === 'sales') {
					// SALES OPERATIONS
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const qs: IDataObject = {};

						const filters = this.getNodeParameter('filters', i) as IDataObject;
						Object.assign(qs, filters);

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/sales', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/sales', {}, qs);
							returnData.push(...(responseData as IDataObject[]));
						}

					} else if (operation === 'update') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/sales/${saleId}`, updateFields);
						returnData.push(responseData);

					} else if (operation === 'delete') {
						const saleId = this.getNodeParameter('saleId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/sales/${saleId}`);
						returnData.push({ success: true, saleId });
					}

				} else if (resource === 'order') {
					// ORDER OPERATIONS
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const orderNumber = this.getNodeParameter('orderNumber', i) as string;
						const items = this.getNodeParameter('items', i) as IDataObject;

						const body: IDataObject = {
							email,
							orderNumber,
							items: (items as any).item || [],
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/order', body);
						returnData.push(responseData);

					} else if (operation === 'refund') {
						const email = this.getNodeParameter('email', i) as string;
						const orderNumber = this.getNodeParameter('orderNumber', i) as string;

						const body: IDataObject = {
							email,
							orderNumber,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/order/refund', body);
						returnData.push(responseData);
					}

				} else if (resource === 'call') {
					// CALL OPERATIONS
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const callId = this.getNodeParameter('callId', i) as string;

						const body: IDataObject = {
							email,
							callId,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/call', body);
						returnData.push(responseData);

					} else if (operation === 'get') {
						const callId = this.getNodeParameter('callId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'GET', `/call/${callId}`);
						returnData.push(responseData);

					} else if (operation === 'update') {
						const callId = this.getNodeParameter('callId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/call/${callId}`, updateFields);
						returnData.push(responseData);

					} else if (operation === 'delete') {
						const callId = this.getNodeParameter('callId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/call/${callId}`);
						returnData.push({ success: true, callId });
					}

				} else if (resource === 'attribution') {
					// ATTRIBUTION OPERATIONS
					if (operation === 'getAdsReport') {
						const platform = this.getNodeParameter('platform', i) as string;
						const level = this.getNodeParameter('level', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;

						const qs: IDataObject = {
							platform,
							level,
							startDate,
							endDate,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);

						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/attribution/ads', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution/ads', {}, qs);
							returnData.push(...(responseData as IDataObject[]));
						}

					} else if (operation === 'getAdAccountReport') {
						const platform = this.getNodeParameter('platform', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;

						const qs: IDataObject = {
							platform,
							startDate,
							endDate,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(qs, additionalFields);

						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/attribution/ad_account', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution/ad_account', {}, qs);
							returnData.push(...(responseData as IDataObject[]));
						}
					}

				} else if (resource === 'product') {
					// PRODUCT OPERATIONS
					if (operation === 'create') {
						const productId = this.getNodeParameter('productId', i) as string;
						const productName = this.getNodeParameter('productName', i) as string;

						const body: IDataObject = {
							productId,
							productName,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/product', body);
						returnData.push(responseData);
					}

				} else if (resource === 'tag') {
					// TAG OPERATIONS
					if (operation === 'getAll') {
						const responseData = await hyrosApiRequest.call(this, 'GET', '/tags');
						returnData.push(...(responseData as IDataObject[]));
					}

				} else if (resource === 'source') {
					// SOURCE OPERATIONS
					if (operation === 'getAll') {
						const responseData = await hyrosApiRequest.call(this, 'GET', '/sources');
						returnData.push(...(responseData as IDataObject[]));

					} else if (operation === 'create') {
						const sourceName = this.getNodeParameter('sourceName', i) as string;

						const body: IDataObject = {
							sourceName,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/source', body);
						returnData.push(responseData);
					}

				} else if (resource === 'ad') {
					// AD OPERATIONS
					if (operation === 'getAll') {
						const platform = this.getNodeParameter('platform', i) as string;
						const qs: IDataObject = { platform };

						const filters = this.getNodeParameter('filters', i) as IDataObject;
						Object.assign(qs, filters);

						const returnAll = this.getNodeParameter('returnAll', i) as boolean;

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/ads', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/ads', {}, qs);
							returnData.push(...(responseData as IDataObject[]));
						}
					}

				} else if (resource === 'customCost') {
					// CUSTOM COST OPERATIONS
					if (operation === 'create') {
						const source = this.getNodeParameter('source', i) as string;
						const date = this.getNodeParameter('date', i) as string;
						const cost = this.getNodeParameter('cost', i) as number;

						const body: IDataObject = {
							source,
							date,
							cost,
						};

						const responseData = await hyrosApiRequest.call(this, 'POST', '/custom-cost', body);
						returnData.push(responseData);
					}

				} else if (resource === 'click') {
					// CLICK OPERATIONS
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;

						const body: IDataObject = {
							email,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/click', body);
						returnData.push(responseData);

					} else if (operation === 'get') {
						const clickId = this.getNodeParameter('clickId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'GET', `/click/${clickId}`);
						returnData.push(responseData);
					}

				} else if (resource === 'cart') {
					// CART OPERATIONS
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const cartId = this.getNodeParameter('cartId', i) as string;
						const items = this.getNodeParameter('items', i) as IDataObject;

						const body: IDataObject = {
							email,
							cartId,
							items: (items as any).item || [],
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/cart', body);
						returnData.push(responseData);

					} else if (operation === 'update') {
						const cartId = this.getNodeParameter('cartId', i) as string;
						const items = this.getNodeParameter('items', i) as IDataObject;

						const body: IDataObject = {
							items: (items as any).item || [],
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/cart/${cartId}`, body);
						returnData.push(responseData);
					}

				} else if (resource === 'userInfo') {
					// USER INFO OPERATIONS
					if (operation === 'get') {
						const responseData = await hyrosApiRequest.call(this, 'GET', '/user');
						returnData.push(responseData);
					}

				} else if (resource === 'keyword') {
					// KEYWORD OPERATIONS
					if (operation === 'get') {
						const keywordId = this.getNodeParameter('keywordId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'GET', `/keyword/${keywordId}`);
						returnData.push(responseData);
					}

				} else if (resource === 'subscription') {
					// SUBSCRIPTION OPERATIONS
					if (operation === 'get') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'GET', `/subscription/${subscriptionId}`);
						returnData.push(responseData);

					} else if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;

						const body: IDataObject = {
							email,
							subscriptionId,
						};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/subscription', body);
						returnData.push(responseData);

					} else if (operation === 'update') {
						const subscriptionId = this.getNodeParameter('subscriptionId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/subscription/${subscriptionId}`, updateFields);
						returnData.push(responseData);
					}
				}

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ error: errorMessage });
					continue;
				}
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
