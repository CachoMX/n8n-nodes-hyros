import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	JsonObject,
	NodeApiError,
	NodeConnectionTypes,
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

import {
	trackingScriptOperations,
	trackingScriptFields,
} from './descriptions/TrackingScriptDescription';

import {
	domainsOperations,
	domainsFields,
} from './descriptions/DomainsDescription';

import {
	stagesOperations,
	stagesFields,
} from './descriptions/StagesDescription';

import {
	adAccountOperations,
	adAccountFields,
} from './descriptions/AdAccountDescription';

import {
	webhookSubscriptionOperations,
	webhookSubscriptionFields,
} from './descriptions/WebhookSubscriptionDescription';

import {
	requestStatusOperations,
	requestStatusFields,
} from './descriptions/RequestStatusDescription';

import {
	urlRuleOperations,
	urlRuleFields,
} from './descriptions/UrlRuleDescription';

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
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
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
						name: 'Ad Account',
						value: 'adAccount',
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
						name: 'Domain',
						value: 'domains',
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
						name: 'Request Status',
						value: 'requestStatus',
					},
					{
						name: 'Sale',
						value: 'sales',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Stage',
						value: 'stages',
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
						name: 'Tracking Script',
						value: 'trackingScript',
					},
					{
						name: 'URL Rule',
						value: 'urlRule',
					},
					{
						name: 'User Info',
						value: 'userInfo',
					},
					{
						name: 'Webhook Subscription',
						value: 'webhookSubscription',
					},
				],
				default: 'lead',
			},
			// Ad Account
			...adAccountOperations,
			...adAccountFields,
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
			// Tracking Script
			...trackingScriptOperations,
			...trackingScriptFields,
			// Domains
			...domainsOperations,
			...domainsFields,
			// Stages
			...stagesOperations,
			...stagesFields,
			// Webhook Subscription
			...webhookSubscriptionOperations,
			...webhookSubscriptionFields,
			// Request Status
			...requestStatusOperations,
			...requestStatusFields,
			// URL Rule
			...urlRuleOperations,
			...urlRuleFields,
		],
		usableAsTool: true,
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
						const body: IDataObject = {};

						if (email) {
							body.email = email;
						}

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						// Empty strings must not reach the API: strict validation (v1.38) rejects
						// a string where these fields expect an array.
						for (const field of ['phoneNumbers', 'leadIps', 'tags']) {
							if (additionalFields[field] !== undefined) {
								const values = String(additionalFields[field]).split(',').map(v => v.trim()).filter(v => v.length > 0);
								if (values.length > 0) {
									body[field] = values;
								}
								delete additionalFields[field];
							}
						}

						// A blank Tags Date from the UI must not reach the API.
						if (!additionalFields.tagsDate) {
							delete additionalFields.tagsDate;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/leads', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'update') {
						const searchBy = this.getNodeParameter('searchBy', i) as string;
						const searchValue = this.getNodeParameter('searchValue', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {};

						// Empty strings must not reach the API: strict validation (v1.38) rejects
						// a string where these fields expect an array.
						for (const field of ['phoneNumbers', 'leadIps', 'tags', 'removeTags', 'removeLeadStages']) {
							if (additionalFields[field] !== undefined) {
								const values = String(additionalFields[field]).split(',').map(v => v.trim()).filter(v => v.length > 0);
								if (values.length > 0) {
									body[field] = values;
								}
								delete additionalFields[field];
							}
						}

						// A blank Tags Date from the UI must not reach the API.
						if (!additionalFields.tagsDate) {
							delete additionalFields.tagsDate;
						}

						if (additionalFields.leadStage) {
							const leadStage = additionalFields.leadStage as IDataObject;
							if (leadStage.stageDetails) {
								const stageDetails = { ...(leadStage.stageDetails as IDataObject) };
								// A blank Date from the UI must not reach the API: strict validation
								// (v1.38) may reject an empty date string.
								if (!stageDetails.date) {
									delete stageDetails.date;
								}
								if (stageDetails.name) {
									body.leadStage = stageDetails;
								}
							}
							delete additionalFields.leadStage;
						}
						// PUT /leads rejects the POST-only `stage` field since strict validation (v1.38);
						// map it to leadStage so workflows saved before 2.8.0 keep working. The delete is
						// unconditional: an empty stored value must not leak into the body either.
						if (additionalFields.stage !== undefined) {
							if (additionalFields.stage && !body.leadStage) {
								body.leadStage = { name: additionalFields.stage };
							}
							delete additionalFields.stage;
						}

						// Add remaining fields to body
						Object.assign(body, additionalFields);

						const qs: IDataObject = {};
						if (searchBy === 'email') {
							qs.email = searchValue;
						} else if (searchBy === 'id') {
							qs.id = searchValue;
						} else if (searchBy === 'phone') {
							qs.phone = searchValue;
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', '/leads', body, qs);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// Format emails and IDs with quotes if provided
						if (filters.emails) {
							const emails = (filters.emails as string).split(',').map(e => e.trim());
							qs.emails = emails.map(e => `"${e}"`).join(',');
						}
						if (filters.ids) {
							const ids = (filters.ids as string).split(',').map(id => id.trim());
							qs.ids = ids.map(id => `"${id}"`).join(',');
						}
						if (filters.tags) {
							const tags = (filters.tags as string).split(',').map(t => t.trim()).filter(t => t.length > 0);
							if (tags.length > 0) {
								qs.tags = tags.map(t => `"${t}"`).join(',');
							}
						}
						if (filters.tagFromDate) {
							qs.tagFromDate = filters.tagFromDate;
						}
						if (filters.tagToDate) {
							qs.tagToDate = filters.tagToDate;
						}
						if (filters.phones) {
							const phones = (filters.phones as string).split(',').map(p => p.trim()).filter(p => p.length > 0);
							if (phones.length > 0) {
								qs.phones = phones.map(p => `"${p}"`).join(',');
							}
						}
						if (filters.stage) {
							const stages = (filters.stage as string).split(',').map(st => st.trim()).filter(st => st.length > 0);
							if (stages.length > 0) {
								qs.stage = stages.map(st => `"${st}"`).join(',');
							}
						}
						if (filters.fromDate) {
							qs.fromDate = filters.fromDate;
						}
						if (filters.toDate) {
							qs.toDate = filters.toDate;
						}
						if (filters.updatedFromDate) {
							qs.updatedFromDate = filters.updatedFromDate;
						}
						if (filters.updatedToDate) {
							qs.updatedToDate = filters.updatedToDate;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/leads', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/leads', {}, qs);
							const leads = (responseData as any).result || [];
							returnData.push(...leads);
						}

					} else if (operation === 'getJourney') {
						// An expression like {{ $json.id }} can resolve to undefined at runtime
						// even though the field is filled in the UI.
						const ids = String(this.getNodeParameter('ids', i) ?? '');
						const emails = String(this.getNodeParameter('emails', i, '') ?? '');
						const idArray = ids.split(',').map(id => id.trim()).filter(id => id.length > 0);
						const emailArray = emails.split(',').map(e => e.trim()).filter(e => e.length > 0);
						if (idArray.length === 0 && emailArray.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Provide either Lead IDs or Emails', { itemIndex: i });
						}
						const qs: IDataObject = {};

						// Pass IDs directly without quotes - API expects: ids=id1,id2,id3
						if (idArray.length > 0) {
							qs.ids = idArray.join(',');
						}
						if (emailArray.length > 0) {
							qs.emails = emailArray.join(',');
						}
						if (this.getNodeParameter('includeEvents', i, false) as boolean) {
							qs.includeEvents = true;
						}

						const responseData = await hyrosApiRequest.call(this, 'GET', '/leads/journey', {}, qs);
						const journeys = (responseData as any).result || [];
						returnData.push(...journeys);

					} else if (operation === 'delete') {
						const searchBy = this.getNodeParameter('searchBy', i) as string;
						const searchValue = String(this.getNodeParameter('searchValue', i) ?? '').trim();
						if (searchValue.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Search Value is required to delete a lead', { itemIndex: i });
						}
						const qs: IDataObject = { [searchBy]: searchValue };

						const responseData = await hyrosApiRequest.call(this, 'DELETE', '/leads', {}, qs);
						returnData.push({ success: true, result: (responseData as any).result });
					}

				} else if (resource === 'sales') {
					// SALES OPERATIONS
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// Handle array fields (ids, emails, leadIds, productTags)
						if (filters.ids) {
							const ids = (filters.ids as string).split(',').map(id => id.trim());
							qs.ids = ids.map(id => `"${id}"`).join(',');
						}
						if (filters.emails) {
							const emails = (filters.emails as string).split(',').map(e => e.trim());
							qs.emails = emails.map(e => `"${e}"`).join(',');
						}
						if (filters.leadIds) {
							const leadIds = (filters.leadIds as string).split(',').map(id => id.trim());
							qs.leadIds = leadIds.map(id => `"${id}"`).join(',');
						}
						if (filters.productTags) {
							const productTags = (filters.productTags as string).split(',').map(t => t.trim());
							qs.productTags = productTags.map(t => `"${t}"`).join(',');
						}

						// Handle other filters
						if (filters.isRecurringSale) {
							qs.isRecurringSale = filters.isRecurringSale;
						}
						if (filters.saleRefundedState) {
							qs.saleRefundedState = filters.saleRefundedState;
						}
						if (filters.fromDate) {
							qs.fromDate = filters.fromDate;
						}
						if (filters.toDate) {
							qs.toDate = filters.toDate;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/sales', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/sales', {}, qs);
							const sales = (responseData as any).result || [];
							returnData.push(...sales);
						}

					} else if (operation === 'update') {
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (!updateFields.ids) {
							throw new NodeOperationError(this.getNode(), 'IDs parameter is required for Sales Update operation', { itemIndex: i });
						}

						// PUT /sales uses query parameters
						if (updateFields.ids) {
							qs.ids = updateFields.ids;
						}
						if (updateFields.isRecurringSale !== undefined) {
							qs.isRecurringSale = updateFields.isRecurringSale;
						}
						if (updateFields.isRefunded !== undefined) {
							qs.isRefunded = updateFields.isRefunded;
						}
						if (updateFields.refundedDate) {
							qs.refundedDate = updateFields.refundedDate;
						}
						if (updateFields.refundedAmount !== undefined) {
							qs.refundedAmount = updateFields.refundedAmount;
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', '/sales', {}, qs);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'delete') {
						const saleId = String(this.getNodeParameter('saleId', i) ?? '').trim();
						if (!saleId) {
							throw new NodeOperationError(this.getNode(), 'Sale ID is required', { itemIndex: i });
						}
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/sales/${encodeURIComponent(saleId)}`);
						returnData.push({ success: true, result: (responseData as any)?.result, saleId });
					}

				} else if (resource === 'order') {
					// ORDER OPERATIONS
					if (operation === 'create') {
						const email = this.getNodeParameter('email', i) as string;
						const itemsData = this.getNodeParameter('items', i) as IDataObject;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {};

						if (email) {
							body.email = email;
						}

						// Process items array - handle packages as array
						const items = (itemsData as any).item || [];
						const processedItems = items.map((item: IDataObject) => {
							const processedItem: IDataObject = { ...item };
							if (item.packages) {
								const packages = (item.packages as string).split(',').map(p => p.trim());
								processedItem.packages = packages;
							}
							return processedItem;
						});
						body.items = processedItems;

						// Handle array fields in additionalFields
						if (additionalFields.leadIps) {
							const leadIps = (additionalFields.leadIps as string).split(',').map(ip => ip.trim());
							body.leadIps = leadIps;
							delete additionalFields.leadIps;
						}
						if (additionalFields.phoneNumbers) {
							const phoneNumbers = (additionalFields.phoneNumbers as string).split(',').map(p => p.trim());
							body.phoneNumbers = phoneNumbers;
							delete additionalFields.phoneNumbers;
						}
						// The API rejects a negative hardCost; fail fast with a clear node error.
						if (typeof additionalFields.hardCost === 'number' && additionalFields.hardCost < 0) {
							throw new NodeOperationError(this.getNode(), 'Hard Cost must not be negative', { itemIndex: i });
						}

						// Add remaining additional fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/orders', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'update') {
						const orderId = String(this.getNodeParameter('orderId', i) ?? '').trim();
						if (!orderId) {
							throw new NodeOperationError(this.getNode(), 'Order ID is required', { itemIndex: i });
						}
						const itemsData = this.getNodeParameter('items', i) as IDataObject;
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;

						// PUT /orders/{id} replaces the order's items, so at least one is required.
						const items = (itemsData as any).item || [];
						if (!Array.isArray(items) || items.length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one item is required to update an order', { itemIndex: i });
						}
						const processedItems = items.map((item: IDataObject) => {
							const processedItem: IDataObject = { ...item };
							if (item.packages) {
								const packages = (item.packages as string).split(',').map(p => p.trim());
								processedItem.packages = packages;
							}
							return processedItem;
						});

						// The API rejects a negative hardCost; fail fast with a clear node error.
						// Omitting it keeps the stored value, sending 0 clears it.
						if (typeof updateFields.hardCost === 'number' && updateFields.hardCost < 0) {
							throw new NodeOperationError(this.getNode(), 'Hard Cost must not be negative', { itemIndex: i });
						}

						const body: IDataObject = {
							items: processedItems,
							...updateFields,
						};

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/orders/${encodeURIComponent(orderId)}`, body);
						returnData.push({ success: true, result: (responseData as any)?.result, orderId });

					} else if (operation === 'refund') {
						const orderId = String(this.getNodeParameter('orderId', i) ?? '').trim();
						if (!orderId) {
							throw new NodeOperationError(this.getNode(), 'Order ID is required', { itemIndex: i });
						}
						const qs: IDataObject = {};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.refundedAmount) {
							qs.refundedAmount = additionalFields.refundedAmount;
						}

						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/orders/${encodeURIComponent(orderId)}`, {}, qs);
						returnData.push({ success: true, result: (responseData as any)?.result, orderId });
					}

				} else if (resource === 'call') {
					// CALL OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							email,
						};

						// Handle array fields
						if (additionalFields.phoneNumbers) {
							const phoneNumbers = (additionalFields.phoneNumbers as string).split(',').map(p => p.trim());
							body.phoneNumbers = phoneNumbers;
							delete additionalFields.phoneNumbers;
						}
						if (additionalFields.leadIps) {
							const leadIps = (additionalFields.leadIps as string).split(',').map(ip => ip.trim());
							body.leadIps = leadIps;
							delete additionalFields.leadIps;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/calls', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'get') {
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// Handle array fields
						if (filters.ids) {
							const ids = (filters.ids as string).split(',').map(id => id.trim());
							qs.ids = ids.map(id => `"${id}"`).join(',');
						}
						if (filters.emails) {
							const emails = (filters.emails as string).split(',').map(e => e.trim());
							qs.emails = emails.map(e => `"${e}"`).join(',');
						}
						if (filters.leadIds) {
							const leadIds = (filters.leadIds as string).split(',').map(id => id.trim());
							qs.leadIds = leadIds.map(id => `"${id}"`).join(',');
						}
						// phoneNumbers is deliberately NOT forwarded: GET /calls does not document it
						// and strict validation (v1.38) rejects it with 400 Unknown parameter
						// (verified live 2026-07-23). Stored filter values from old workflows are ignored.
						if (filters.productTags) {
							const productTags = (filters.productTags as string).split(',').map(t => t.trim());
							qs.productTags = productTags.map(t => `"${t}"`).join(',');
						}
						if (filters.fromDate) {
							qs.fromDate = filters.fromDate;
						}
						if (filters.toDate) {
							qs.toDate = filters.toDate;
						}
						if (filters.pageSize) {
							qs.pageSize = filters.pageSize;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}
						if (filters.qualified !== undefined) {
							qs.qualified = filters.qualified;
						}
						if (filters.qualificationStages) {
							const qualificationStages = (filters.qualificationStages as string).split(',').map(s => s.trim());
							qs.qualificationStages = qualificationStages.map(s => `"${s}"`).join(',');
						}

						if (this.getNodeParameter('returnAll', i, false) as boolean) {
							delete qs.pageSize;
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/calls', {}, qs);
							returnData.push(...responseData);
						} else {
							const responseData = await hyrosApiRequest.call(this, 'GET', '/calls', {}, qs);
							const calls = (responseData as any).result || [];
							returnData.push(...calls);
						}

					} else if (operation === 'update') {
						const ids = this.getNodeParameter('ids', i) as string;
						const externalIds = this.getNodeParameter('externalIds', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (!ids && !externalIds) {
							throw new NodeOperationError(this.getNode(), 'Either IDs or External IDs must be provided for Call Update operation', { itemIndex: i });
						}

						// PUT /calls uses query parameters
						if (ids) {
							qs.ids = ids;
						}
						if (externalIds) {
							qs.externalIds = externalIds;
						}
						if (name) {
							qs.name = name;
						}
						if (additionalFields.qualification) {
							qs.qualification = additionalFields.qualification;
						}
						if (additionalFields.state) {
							qs.state = additionalFields.state;
						}
						if (additionalFields.qualified !== undefined) {
							qs.qualified = additionalFields.qualified;
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', '/calls', {}, qs);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'delete') {
						const callId = String(this.getNodeParameter('callId', i) ?? '').trim();
						if (!callId) {
							throw new NodeOperationError(this.getNode(), 'Call ID is required', { itemIndex: i });
						}
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/calls/${encodeURIComponent(callId)}`);
						returnData.push({ success: true, result: (responseData as any)?.result, callId });
					}

				} else if (resource === 'attribution') {
					// ATTRIBUTION OPERATIONS
					if (operation === 'getAdsReport') {
						const attributionModel = this.getNodeParameter('attributionModel', i) as string;
						const level = this.getNodeParameter('level', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;
						const fields = this.getNodeParameter('fields', i) as string[];
						const ids = this.getNodeParameter('ids', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const qs: IDataObject = {
							attributionModel,
							level,
							startDate,
							endDate,
							fields: fields.join(','),
							ids,
						};

						// Handle additional fields
						if (additionalFields.keywordsIds) {
							qs.keywordsIds = additionalFields.keywordsIds;
						}
						if (additionalFields.currency) {
							qs.currency = additionalFields.currency;
						}
						if (additionalFields.dayOfAttribution !== undefined) {
							qs.dayOfAttribution = additionalFields.dayOfAttribution;
						}
						if (additionalFields.scientificDaysRange) {
							qs.scientificDaysRange = additionalFields.scientificDaysRange;
						}
						if (additionalFields.sourceConfiguration) {
							qs.sourceConfiguration = additionalFields.sourceConfiguration;
						}
						if (additionalFields.ignoreRecurringSales !== undefined) {
							qs.ignoreRecurringSales = additionalFields.ignoreRecurringSales;
						}
						if (additionalFields.isAdAccountId !== undefined) {
							qs.isAdAccountId = additionalFields.isAdAccountId;
						}
						if (additionalFields.forecastingOption) {
							qs.forecastingOption = additionalFields.forecastingOption;
						}
						if (additionalFields.windowAttributionDaysRange) {
							qs.windowAttributionDaysRange = additionalFields.windowAttributionDaysRange;
						}
						if (additionalFields.newCustomerConfiguration) {
							qs.newCustomerConfiguration = additionalFields.newCustomerConfiguration;
						}
						if (additionalFields.status) {
							qs.status = additionalFields.status;
						}
						if (additionalFields.leadStage) {
							// The API's query parameter is snake_case, unlike every other one.
							qs.lead_stage = additionalFields.leadStage;
						}
						if (additionalFields.timeGroupingOption) {
							qs.timeGroupingOption = additionalFields.timeGroupingOption;
						}
						if (additionalFields.pageSize) {
							qs.pageSize = additionalFields.pageSize;
						}
						if (additionalFields.pageId) {
							qs.pageId = additionalFields.pageId;
						}

						const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution', {}, qs);
						const attribution = (responseData as any).result || [];
						returnData.push(...attribution);

					} else if (operation === 'getAdAccountReport') {
						const attributionModel = this.getNodeParameter('attributionModel', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;
						const fields = this.getNodeParameter('fields', i) as string[];
						const ids = this.getNodeParameter('ids', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const qs: IDataObject = {
							attributionModel,
							startDate,
							endDate,
							fields: fields.join(','),
							ids,
						};

						// Handle additional fields
						if (additionalFields.currency) {
							qs.currency = additionalFields.currency;
						}
						if (additionalFields.dayOfAttribution !== undefined) {
							qs.dayOfAttribution = additionalFields.dayOfAttribution;
						}
						if (additionalFields.scientificDaysRange) {
							qs.scientificDaysRange = additionalFields.scientificDaysRange;
						}
						if (additionalFields.sourceConfiguration) {
							qs.sourceConfiguration = additionalFields.sourceConfiguration;
						}
						if (additionalFields.ignoreRecurringSales !== undefined) {
							qs.ignoreRecurringSales = additionalFields.ignoreRecurringSales;
						}
						if (additionalFields.forecastingOption) {
							qs.forecastingOption = additionalFields.forecastingOption;
						}
						if (additionalFields.windowAttributionDaysRange) {
							qs.windowAttributionDaysRange = additionalFields.windowAttributionDaysRange;
						}
						if (additionalFields.newCustomerConfiguration) {
							qs.newCustomerConfiguration = additionalFields.newCustomerConfiguration;
						}
						if (additionalFields.dateTimeGroupingOption) {
							// The Hyros spec documents this as dateTimeGroupingOption, but the API silently
							// ignores that name and returns one aggregate row. Only adLevelDateGroupingOption
							// is honored (verified live 2026-08-04). The UI field keeps the documented name so
							// existing workflows keep working.
							qs.adLevelDateGroupingOption = additionalFields.dateTimeGroupingOption;
						}
						// pageSize/pageId are deliberately NOT forwarded: GET /attribution/ad-account
						// documents no pagination and strict validation (v1.38) 400s on unknown params.

						const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution/ad-account', {}, qs);
						const attribution = (responseData as any).result || [];
						returnData.push(...attribution);

					} else if (operation === 'getRoas') {
						const entityId = String(this.getNodeParameter('entityId', i) ?? '').trim();
						if (!entityId) {
							throw new NodeOperationError(this.getNode(), 'Entity ID is required', { itemIndex: i });
						}
						const qs: IDataObject = {
							id: entityId,
							level: this.getNodeParameter('entityLevel', i),
							startDate: this.getNodeParameter('startDate', i),
							endDate: this.getNodeParameter('endDate', i),
						};
						const basis = this.getNodeParameter('basis', i, '') as string;
						if (basis) {
							qs.basis = basis;
						}

						const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution/roas', {}, qs);
						// The result is a single object (or absent when the entity has no row for the range).
						returnData.push((responseData as any)?.result || { result: null, request_id: (responseData as any)?.request_id });

					} else if (operation === 'getMarginalCacCurve') {
						const entityId = String(this.getNodeParameter('entityId', i) ?? '').trim();
						if (!entityId) {
							throw new NodeOperationError(this.getNode(), 'Entity ID is required', { itemIndex: i });
						}
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {
							id: entityId,
							level: this.getNodeParameter('entityLevel', i),
						};
						if (additionalFields.startDate) {
							qs.startDate = additionalFields.startDate;
						}
						if (additionalFields.endDate) {
							qs.endDate = additionalFields.endDate;
						}
						if (additionalFields.ltvWindow) {
							qs.ltvWindow = additionalFields.ltvWindow;
						}
						// 0 is a valid ceiling per the spec, but the UI cannot distinguish an
						// untouched 0 default from an intentional one, so only forward positives.
						if (typeof additionalFields.cacCeiling === 'number' && additionalFields.cacCeiling > 0) {
							qs.cacCeiling = additionalFields.cacCeiling;
						}
						if (additionalFields.attributionModel) {
							qs.attributionModel = additionalFields.attributionModel;
						}

						const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution/marginal-cac-curve', {}, qs);
						returnData.push((responseData as any)?.result || { result: null, request_id: (responseData as any)?.request_id });
					}

				} else if (resource === 'product') {
					// PRODUCT OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
							price,
						};

						// Handle packages array
						if (additionalFields.packages) {
							const packages = (additionalFields.packages as string).split(',').map(p => p.trim());
							body.packages = packages;
							delete additionalFields.packages;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/products', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// GET /products enforces strict validation and only accepts name, tag
						// (singular), category and isRecurringSale (API v1.40). The ids and tags
						// filters shipped before 2.10.0 now 400 as Unknown parameter, so stored
						// values from old workflows are deliberately ignored.
						for (const key of ['name', 'tag', 'category', 'pageId']) {
							if (filters[key]) {
								qs[key] = filters[key];
							}
						}
						if (filters.isRecurringSale && filters.isRecurringSale !== 'ALL') {
							qs.isRecurringSale = filters.isRecurringSale;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/products', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/products', {}, qs);
							returnData.push(...((responseData as any).result || []));
						}

					} else if (operation === 'update') {
						const productId = String(this.getNodeParameter('productId', i) ?? '').trim();
						if (productId.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Product ID is required', { itemIndex: i });
						}
						const updateFields = { ...(this.getNodeParameter('updateFields', i) as IDataObject) };
						if (Object.keys(updateFields).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field to update is required', { itemIndex: i });
						}

						// PUT /products/{id} enforces strict validation: the API's field names are
						// customCost and isRecurringSale, not the costOfGoods/recurring the UI kept
						// for saved-workflow compatibility.
						if (updateFields.costOfGoods !== undefined) {
							updateFields.customCost = updateFields.costOfGoods;
							delete updateFields.costOfGoods;
						}
						if (updateFields.recurring !== undefined) {
							updateFields.isRecurringSale = updateFields.recurring;
							delete updateFields.recurring;
						}
						if (updateFields.packages !== undefined) {
							// '[]' removes the product from all packages; omitting keeps them.
							const raw = String(updateFields.packages).trim();
							if (raw === '[]') {
								updateFields.packages = [];
							} else {
								const values = raw.split(',').map(p => p.trim()).filter(p => p.length > 0);
								if (values.length > 0) {
									updateFields.packages = values;
								} else {
									delete updateFields.packages;
								}
							}
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/products/${encodeURIComponent(productId)}`, updateFields);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'delete') {
						const productId = String(this.getNodeParameter('productId', i) ?? '').trim();
						if (productId.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Product ID is required', { itemIndex: i });
						}

						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/products/${encodeURIComponent(productId)}`);
						returnData.push({ success: true, result: (responseData as any).result });
					}

				} else if (resource === 'adAccount') {
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.ids) {
							qs.ids = filters.ids;
						}
						if (filters.fields) {
							qs.fields = filters.fields;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/ad-accounts', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i, 50) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/ad-accounts', {}, qs);
							returnData.push(...((responseData as any).result || []));
						}
					}

				} else if (resource === 'tag') {
					// TAG OPERATIONS
					if (operation === 'getAll') {
						const responseData = await hyrosApiRequest.call(this, 'GET', '/tags');
						// API returns { request_id, result: [...tags] }
						const tags = (responseData as any).result || [];
						// Convert tag strings to objects
						const tagObjects = tags.map((tag: string) => ({ tag }));
						returnData.push(...tagObjects);

					} else if (operation === 'getCount') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						if (filters.name) {
							qs.name = filters.name;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/tags/count', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/tags/count', {}, qs);
							returnData.push(...((responseData as any).result || []));
						}
					}

				} else if (resource === 'source') {
					// SOURCE OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							name,
						};

						// Add optional fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/sources', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// Handle filters
						if (filters.adSourceIds) {
							const adSourceIds = (filters.adSourceIds as string).split(',').map(id => id.trim());
							qs.adSourceIds = adSourceIds.join(',');
						}
						if (filters.includeOrganic !== undefined) {
							qs.includeOrganic = filters.includeOrganic;
						}
						if (filters.includeDisregarded !== undefined) {
							qs.includeDisregarded = filters.includeDisregarded;
						}
						if (filters.integrationType) {
							qs.integrationType = filters.integrationType;
						}
						if (filters.name) {
							qs.name = filters.name;
						}
						if (filters.tag) {
							qs.tag = filters.tag;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/sources', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/sources', {}, qs);
							const sources = (responseData as any).result || [];
							returnData.push(...sources);
						}
					} else if (operation === 'update') {
						const sourceTag = String(this.getNodeParameter('sourceTag', i) ?? '').trim();
						if (sourceTag.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Source Tag is required', { itemIndex: i });
						}
						const updateFields = this.getNodeParameter('updateFields', i) as IDataObject;
						if (Object.keys(updateFields).length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one field to update is required', { itemIndex: i });
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/sources/${sourceTag}`, updateFields);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'delete') {
						const sourceTag = String(this.getNodeParameter('sourceTag', i) ?? '').trim();
						if (sourceTag.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Source Tag is required', { itemIndex: i });
						}

						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/sources/${sourceTag}`);
						returnData.push({ success: true, result: (responseData as any).result });
					}

				} else if (resource === 'ad') {
					// AD OPERATIONS
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// Handle filters
						if (filters.integrationType) {
							qs.integrationType = filters.integrationType;
						}
						if (filters.adSourceIds) {
							const adSourceIds = (filters.adSourceIds as string).split(',').map(id => id.trim());
							qs.adSourceIds = adSourceIds.join(',');
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/ads', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/ads', {}, qs);
							const ads = (responseData as any).result || [];
							returnData.push(...ads);
						}
					}

				} else if (resource === 'customCost') {
					// CUSTOM COST OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const endDate = this.getNodeParameter('endDate', i) as string;
						const frequency = this.getNodeParameter('frequency', i) as string;
						const cost = this.getNodeParameter('cost', i) as number;
						const tags = this.getNodeParameter('tags', i) as string[];

						const body: IDataObject = {
							startDate,
							frequency,
							cost,
							tags,
						};

						// Add name only if provided (it's optional per API spec)
						if (name) {
							body.name = name;
						}

						// Add endDate only if provided (it's optional per API spec)
						if (endDate) {
							body.endDate = endDate;
						}

						const responseData = await hyrosApiRequest.call(this, 'POST', '/custom-costs', body);
						returnData.push({ success: true, result: (responseData as any).result });
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						for (const key of ['ids', 'fromDate', 'toDate', 'pageId']) {
							if (filters[key]) {
								qs[key] = filters[key];
							}
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/custom-costs', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/custom-costs', {}, qs);
							returnData.push(...((responseData as any).result || []));
						}

					} else if (operation === 'update') {
						const customCostId = String(this.getNodeParameter('customCostId', i) ?? '').trim();
						if (customCostId.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Custom Cost ID is required', { itemIndex: i });
						}
						// PUT replaces the whole record, so every required field is sent even when unchanged.
						const body: IDataObject = {
							startDate: this.getNodeParameter('startDate', i),
							frequency: this.getNodeParameter('frequency', i),
							cost: this.getNodeParameter('cost', i),
							tags: this.getNodeParameter('tags', i),
						};
						const name = this.getNodeParameter('name', i, '') as string;
						if (name) {
							body.name = name;
						}
						const endDate = this.getNodeParameter('endDate', i, '') as string;
						if (endDate) {
							body.endDate = endDate;
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', `/custom-costs/${encodeURIComponent(customCostId)}`, body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'delete') {
						const customCostId = String(this.getNodeParameter('customCostId', i) ?? '').trim();
						if (customCostId.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Custom Cost ID is required', { itemIndex: i });
						}

						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/custom-costs/${encodeURIComponent(customCostId)}`);
						returnData.push({ success: true, result: (responseData as any).result });
					}

				} else if (resource === 'click') {
					// CLICK OPERATIONS
					if (operation === 'create') {
						const referrerUrl = this.getNodeParameter('referrerUrl', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							referrerUrl,
						};

						// Handle phones array
						if (additionalFields.phones) {
							const phones = (additionalFields.phones as string).split(',').map(p => p.trim());
							body.phones = phones;
							delete additionalFields.phones;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/clicks', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'get') {
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// GET /leads/clicks uses query parameters. Exactly one of leadId, leadIds
						// or emails must be provided; the API 400s on none, or more than one.
						if (filters.leadId) {
							qs.leadId = filters.leadId;
						}
						if (filters.leadIds) {
							const leadIds = (filters.leadIds as string).split(',').map(id => id.trim()).filter(id => id.length > 0);
							if (leadIds.length > 0) {
								qs.leadIds = leadIds.map(id => `"${id}"`).join(',');
							}
						}
						if (filters.emails) {
							const emails = (filters.emails as string).split(',').map(e => e.trim()).filter(e => e.length > 0);
							if (emails.length > 0) {
								qs.emails = emails.map(e => `"${e}"`).join(',');
							}
						}
						if (filters.email) {
							qs.email = filters.email;
						}
						if (filters.pageSize) {
							qs.pageSize = filters.pageSize;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}
						if (filters.fromDate) {
							qs.fromDate = filters.fromDate;
						}
						if (filters.toDate) {
							qs.toDate = filters.toDate;
						}

						if (this.getNodeParameter('returnAll', i, false) as boolean) {
							delete qs.pageSize;
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/leads/clicks', {}, qs);
							returnData.push(...responseData);
						} else {
							const responseData = await hyrosApiRequest.call(this, 'GET', '/leads/clicks', {}, qs);
							const clicks = (responseData as any).result || [];
							returnData.push(...clicks);
						}
					}

				} else if (resource === 'cart') {
					// CART OPERATIONS
					if (operation === 'create') {
						const itemsData = this.getNodeParameter('items', i) as IDataObject;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							items: (itemsData as any).item || [],
						};

						// Handle array fields
						if (additionalFields.leadIps) {
							const leadIps = (additionalFields.leadIps as string).split(',').map(ip => ip.trim());
							body.leadIps = leadIps;
							delete additionalFields.leadIps;
						}
						if (additionalFields.phoneNumbers) {
							const phoneNumbers = (additionalFields.phoneNumbers as string).split(',').map(p => p.trim());
							body.phoneNumbers = phoneNumbers;
							delete additionalFields.phoneNumbers;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/carts', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'update') {
						const cartId = this.getNodeParameter('cartId', i) as string;
						const itemsData = this.getNodeParameter('items', i) as IDataObject;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							cartId,
							items: (itemsData as any).item || [],
						};

						// Handle array fields
						if (additionalFields.leadIps) {
							const leadIps = (additionalFields.leadIps as string).split(',').map(ip => ip.trim());
							body.leadIps = leadIps;
							delete additionalFields.leadIps;
						}
						if (additionalFields.phoneNumbers) {
							const phoneNumbers = (additionalFields.phoneNumbers as string).split(',').map(p => p.trim());
							body.phoneNumbers = phoneNumbers;
							delete additionalFields.phoneNumbers;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'PUT', '/carts', body);
						returnData.push({ success: true, result: (responseData as any).result });
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};
						for (const key of ['emails', 'leadIds', 'fromDate', 'toDate', 'pageId']) {
							if (filters[key]) {
								qs[key] = filters[key];
							}
						}
						if (filters.purchased !== undefined) {
							qs.purchased = filters.purchased;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/carts', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/carts', {}, qs);
							returnData.push(...((responseData as any).result || []));
						}
					}

				} else if (resource === 'userInfo') {
					// USER INFO OPERATIONS
					if (operation === 'get') {
						const responseData = await hyrosApiRequest.call(this, 'GET', '/user-info');
						// API returns { request_id, result: {...} }
						const userInfo = (responseData as any).result || responseData;
						returnData.push(userInfo);
					}

				} else if (resource === 'keyword') {
					// KEYWORD OPERATIONS
					if (operation === 'get') {
						const adgroupId = String(this.getNodeParameter('adgroupId', i, '') ?? '').trim();
						const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						const qs: IDataObject = {};
						// adgroupId is optional: without it the API lists all keywords.
						if (adgroupId) {
							qs.adgroupId = adgroupId;
						}
						if (additionalFields.pageId) {
							qs.pageId = additionalFields.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/keywords', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i, 50) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/keywords', {}, qs);
							const keywords = (responseData as any).result || [];
							returnData.push(...keywords);
						}
					}

				} else if (resource === 'subscription') {
					// SUBSCRIPTION OPERATIONS
					if (operation === 'get') {
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						// Handle array fields
						if (filters.ids) {
							const ids = (filters.ids as string).split(',').map(id => id.trim());
							qs.ids = ids.map(id => `"${id}"`).join(',');
						}
						if (filters.emails) {
							const emails = (filters.emails as string).split(',').map(e => e.trim());
							qs.emails = emails.map(e => `"${e}"`).join(',');
						}
						if (filters.leadIds) {
							const leadIds = (filters.leadIds as string).split(',').map(id => id.trim());
							qs.leadIds = leadIds.map(id => `"${id}"`).join(',');
						}
						if (filters.productTags) {
							const productTags = (filters.productTags as string).split(',').map(t => t.trim());
							qs.productTags = productTags.map(t => `"${t}"`).join(',');
						}
						if (filters.subscriptionStates) {
							const subscriptionStates = (filters.subscriptionStates as string).split(',').map(s => s.trim());
							qs.subscriptionStates = subscriptionStates.join(',');
						}
						if (filters.fromDate) {
							qs.fromDate = filters.fromDate;
						}
						if (filters.toDate) {
							qs.toDate = filters.toDate;
						}
						if (filters.pageSize) {
							qs.pageSize = filters.pageSize;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (this.getNodeParameter('returnAll', i, false) as boolean) {
							delete qs.pageSize;
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/subscriptions', {}, qs);
							returnData.push(...responseData);
						} else {
							const responseData = await hyrosApiRequest.call(this, 'GET', '/subscriptions', {}, qs);
							const subscriptions = (responseData as any).result || [];
							returnData.push(...subscriptions);
						}

					} else if (operation === 'create') {
						const status = this.getNodeParameter('status', i) as string;
						const startDate = this.getNodeParameter('startDate', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const periodicity = this.getNodeParameter('periodicity', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							status,
							startDate,
							price,
							periodicity,
						};

						// Handle array fields
						if (additionalFields.phoneNumbers) {
							const phoneNumbers = (additionalFields.phoneNumbers as string).split(',').map(p => p.trim());
							body.phoneNumbers = phoneNumbers;
							delete additionalFields.phoneNumbers;
						}
						if (additionalFields.leadIps) {
							const leadIps = (additionalFields.leadIps as string).split(',').map(ip => ip.trim());
							body.leadIps = leadIps;
							delete additionalFields.leadIps;
						}

						// Add remaining fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/subscriptions', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'update') {
						const ids = String(this.getNodeParameter('ids', i) ?? '')
							.split(',').map(id => id.trim()).filter(id => id.length > 0);
						if (ids.length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one subscription ID is required', { itemIndex: i });
						}
						const price = this.getNodeParameter('price', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							ids,
						};

						// The API only requires ids (v1.40). A price of 0 means "leave unchanged"
						// in the UI, since the number field cannot distinguish unset from 0.
						if (price) {
							body.price = price;
						}

						// Add optional fields
						if (additionalFields.name) {
							body.name = additionalFields.name;
						}
						if (additionalFields.status) {
							body.status = additionalFields.status;
						}
						if (additionalFields.startDate) {
							body.startDate = additionalFields.startDate;
						}
						if (additionalFields.endDate) {
							body.endDate = additionalFields.endDate;
						}
						if (additionalFields.cancelAtDate) {
							body.cancelAtDate = additionalFields.cancelAtDate;
						}
						if (additionalFields.trialStartDate) {
							body.trialStartDate = additionalFields.trialStartDate;
						}
						if (additionalFields.trialEndDate) {
							body.trialEndDate = additionalFields.trialEndDate;
						}

						const responseData = await hyrosApiRequest.call(this, 'PUT', '/subscriptions', body);
						returnData.push({ success: true, result: (responseData as any).result });
					}
				} else if (resource === 'trackingScript') {
					// TRACKING SCRIPT OPERATIONS
					if (operation === 'get') {
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						if (additionalFields.domain) {
							qs.domain = additionalFields.domain;
						}
						// Boolean script options are only sent when the user added them, so the
						// deleteTrackingScriptParams user-metadata setting is not touched otherwise.
						for (const flag of ['spa', 'ignorePrevUrl', 'embed', 'deleteTrackingScriptParams']) {
							if (additionalFields[flag] !== undefined) {
								qs[flag] = additionalFields[flag];
							}
						}

						// Tracking script returns text/plain, not JSON
						const credentials = await this.getCredentials('hyrosApi');
						const trackingBaseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
						const accessibleAccountId = ((credentials.accessibleAccountId as string) || '').trim();
						const options: any = {
							method: 'GET',
							qs,
							url: `${trackingBaseUrl}/api/v1.0/tracking-script`,
							json: false, // Important: response is text/plain, not JSON
						};
						if (accessibleAccountId) {
							options.headers = { 'Accessible-Account-Id': accessibleAccountId };
						}

						if (Object.keys(qs).length === 0) {
							delete options.qs;
						}

						const responseData = await this.helpers.httpRequestWithAuthentication.call(this, 'hyrosApi', options);
						// Response is plain text (HTML script), wrap it for n8n
						returnData.push({ script: responseData });
					}
				} else if (resource === 'domains') {
					// DOMAINS OPERATIONS
					if (operation === 'getAll') {
						// The v1.40 spec claims this endpoint lives under /api/v1/, but the live
						// API serves it at /api/v1.0/domains and 404s the spec path (verified
						// 2026-08-19). Keep the default path the API actually answers on.
						const responseData = await hyrosApiRequest.call(this, 'GET', '/domains');
						// API returns array of domain strings, convert to objects
						const domains = (responseData as string[]).map(domain => ({ domain }));
						returnData.push(...domains);
					}
				} else if (resource === 'webhookSubscription') {
					// WEBHOOK SUBSCRIPTION OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const targetUrl = this.getNodeParameter('targetUrl', i) as string;
						const eventTypes = this.getNodeParameter('eventTypes', i) as string[];

						// required:true on a multiOptions does not stop an empty selection in the n8n UI
						if (!Array.isArray(eventTypes) || eventTypes.length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one event type is required', { itemIndex: i });
						}

						const body: IDataObject = {
							name,
							targetUrl,
							eventTypes,
						};

						const responseData = await hyrosApiRequest.call(this, 'POST', '/webhook-subscriptions', body);
						// The result carries the one-time secretKey; return it as-is so users can store it.
						returnData.push((responseData as any)?.result || responseData);

					} else if (operation === 'getAll') {
						const responseData = await hyrosApiRequest.call(this, 'GET', '/webhook-subscriptions');
						const subscriptions = (responseData as any).result || [];
						returnData.push(...subscriptions);

					} else if (operation === 'delete') {
						const externalId = String(this.getNodeParameter('externalId', i) ?? '').trim();
						if (!externalId) {
							throw new NodeOperationError(this.getNode(), 'External ID is required', { itemIndex: i });
						}
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/webhook-subscriptions/${encodeURIComponent(externalId)}`);
						returnData.push({ success: true, result: (responseData as any)?.result, externalId });
					}

				} else if (resource === 'requestStatus') {
					// REQUEST STATUS OPERATIONS
					if (operation === 'get') {
						const requestId = String(this.getNodeParameter('requestId', i) ?? '').trim();
						if (!requestId) {
							throw new NodeOperationError(this.getNode(), 'Request ID is required', { itemIndex: i });
						}
						const responseData = await hyrosApiRequest.call(this, 'GET', `/requests/${encodeURIComponent(requestId)}`);
						// The status object (requestId, status, eventType, dates, snapshot result) lives in result.
						returnData.push((responseData as any)?.result || responseData);
					}

				} else if (resource === 'urlRule') {
					// URL RULE OPERATIONS
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (filters.ids) {
							// Quoted like every other array filter in this node (leads, sales, calls).
							const ids = (filters.ids as string).split(',').map(id => id.trim()).filter(id => id.length > 0);
							if (ids.length > 0) {
								qs.ids = ids.map(id => `"${id}"`).join(',');
							}
						}
						for (const key of ['tag', 'urlRuleActionType', 'fromDate', 'toDate', 'pageId']) {
							if (filters[key]) {
								qs[key] = filters[key];
							}
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/url-rules', {}, qs);
							returnData.push(...responseData);
						} else {
							qs.pageSize = this.getNodeParameter('limit', i) as number;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/url-rules', {}, qs);
							returnData.push(...((responseData as any).result || []));
						}

					} else if (operation === 'get') {
						const urlRuleId = String(this.getNodeParameter('urlRuleId', i) ?? '').trim();
						if (!urlRuleId) {
							throw new NodeOperationError(this.getNode(), 'URL Rule ID is required', { itemIndex: i });
						}
						const responseData = await hyrosApiRequest.call(this, 'GET', `/url-rules/${encodeURIComponent(urlRuleId)}`);
						// The envelope carries at most one element; an empty array means no rule has that id.
						returnData.push(...((responseData as any).result || []));

					} else if (operation === 'create' || operation === 'update') {
						const name = this.getNodeParameter('name', i) as string;
						const tag = this.getNodeParameter('tag', i) as string;
						const wordsToMatch = String(this.getNodeParameter('wordsToMatch', i) ?? '')
							.split(',').map(w => w.trim()).filter(w => w.length > 0);
						const sourceRuleTypes = this.getNodeParameter('sourceRuleTypes', i) as string[];
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						if (wordsToMatch.length === 0) {
							throw new NodeOperationError(this.getNode(), 'Words to Match must contain at least one non-empty value', { itemIndex: i });
						}
						// required:true on a multiOptions does not stop an empty selection in the n8n UI
						if (!Array.isArray(sourceRuleTypes) || sourceRuleTypes.length === 0) {
							throw new NodeOperationError(this.getNode(), 'At least one source rule type is required', { itemIndex: i });
						}

						const body: IDataObject = {
							name,
							tag,
							wordsToMatch,
							sourceRuleTypes,
						};

						if (additionalFields.wordsNotToMatch) {
							const words = String(additionalFields.wordsNotToMatch)
								.split(',').map(w => w.trim()).filter(w => w.length > 0);
							if (words.length > 0) {
								body.wordsNotToMatch = words;
							}
						}
						// Both accept at most one value, so the UI takes a single string and wraps it.
						if (additionalFields.trafficSourceToMatch) {
							body.trafficSourceToMatch = [String(additionalFields.trafficSourceToMatch).trim()];
						}
						if (additionalFields.sourceCategoryToMatch) {
							body.sourceCategoryToMatch = [String(additionalFields.sourceCategoryToMatch).trim()];
						}
						for (const key of ['trafficSourceCategory', 'sourceCategory']) {
							if (additionalFields[key]) {
								body[key] = additionalFields[key];
							}
						}
						for (const flag of ['applyBaseDomain', 'disregardSource', 'isEnabled', 'createLeadStage']) {
							if (additionalFields[flag] !== undefined) {
								body[flag] = additionalFields[flag];
							}
						}
						if (additionalFields.scores) {
							const scoreEntries = ((additionalFields.scores as IDataObject).score || []) as IDataObject[];
							const scores = scoreEntries
								.map((entry) => ({
									keywords: String(entry.keywords ?? '').split(',').map(k => k.trim()).filter(k => k.length > 0),
									score: entry.score ?? 0,
								}))
								.filter((entry) => entry.keywords.length > 0);
							if (scores.length > 0) {
								body.scores = scores;
							}
						}

						if (operation === 'update') {
							const urlRuleId = String(this.getNodeParameter('urlRuleId', i) ?? '').trim();
							if (!urlRuleId) {
								throw new NodeOperationError(this.getNode(), 'URL Rule ID is required', { itemIndex: i });
							}
							// PUT is a full replacement: omitted optional fields are cleared by the API.
							const responseData = await hyrosApiRequest.call(this, 'PUT', `/url-rules/${encodeURIComponent(urlRuleId)}`, body);
							returnData.push({ success: true, result: (responseData as any).result, urlRuleId });
						} else {
							// Synchronous: result carries the new rule's ur-<id>.
							const responseData = await hyrosApiRequest.call(this, 'POST', '/url-rules', body);
							returnData.push({ success: true, result: (responseData as any).result });
						}

					} else if (operation === 'delete') {
						const urlRuleId = String(this.getNodeParameter('urlRuleId', i) ?? '').trim();
						if (!urlRuleId) {
							throw new NodeOperationError(this.getNode(), 'URL Rule ID is required', { itemIndex: i });
						}
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/url-rules/${encodeURIComponent(urlRuleId)}`);
						returnData.push({ success: true, result: (responseData as any)?.result, urlRuleId });
					}

				} else if (resource === 'stages') {
					// STAGES OPERATIONS
					if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i) as IDataObject;
						const qs: IDataObject = {};

						if (filters.name) {
							qs.name = filters.name;
						}
						if (filters.stageFromDate) {
							qs.stageFromDate = filters.stageFromDate;
						}
						if (filters.stageToDate) {
							qs.stageToDate = filters.stageToDate;
						}
						if (filters.pageId) {
							qs.pageId = filters.pageId;
						}

						if (returnAll) {
							const responseData = await hyrosApiRequestAllItems.call(this, 'GET', '/stages', {}, qs);
							returnData.push(...responseData);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							qs.pageSize = limit;
							const responseData = await hyrosApiRequest.call(this, 'GET', '/stages', {}, qs);
							const stages = (responseData as any).result || [];
							returnData.push(...stages);
						}
					}
				}

			} catch (error) {
				if (this.continueOnFail()) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error';
					returnData.push({ error: errorMessage });
					continue;
				}
				throw error instanceof NodeApiError || error instanceof NodeOperationError
					? error
					: new NodeApiError(this.getNode(), error as JsonObject);
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
