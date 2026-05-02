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
						name: 'Domains',
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
						name: 'Sales',
						value: 'sales',
					},
					{
						name: 'Source',
						value: 'source',
					},
					{
						name: 'Stages',
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
			// Tracking Script
			...trackingScriptOperations,
			...trackingScriptFields,
			// Domains
			...domainsOperations,
			...domainsFields,
			// Stages
			...stagesOperations,
			...stagesFields,
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
						const body: IDataObject = {};

						if (email) {
							body.email = email;
						}

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						// Handle array fields (phoneNumbers, leadIps, tags)
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
						if (additionalFields.tags) {
							const tags = (additionalFields.tags as string).split(',').map(t => t.trim());
							body.tags = tags;
							delete additionalFields.tags;
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
						if (additionalFields.tags) {
							const tags = (additionalFields.tags as string).split(',').map(t => t.trim());
							body.tags = tags;
							delete additionalFields.tags;
						}

						// Handle leadStage object
						if (additionalFields.leadStage) {
							const leadStage = additionalFields.leadStage as IDataObject;
							if (leadStage.stageDetails) {
								body.leadStage = leadStage.stageDetails;
							}
							delete additionalFields.leadStage;
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
						const ids = this.getNodeParameter('ids', i) as string;
						const qs: IDataObject = {};

						// Pass IDs directly without quotes - API expects: ids=id1,id2,id3
						const idArray = ids.split(',').map(id => id.trim());
						qs.ids = idArray.join(',');

						const responseData = await hyrosApiRequest.call(this, 'GET', '/leads/journey', {}, qs);
						const journeys = (responseData as any).result || [];
					returnData.push(...journeys);
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

						// Validate that ids parameter is provided
						if (!updateFields.ids) {
							throw new Error('IDs parameter is required for Sales Update operation');
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
						const saleId = this.getNodeParameter('saleId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/sales/${saleId}`);
						returnData.push({ success: true, result: (responseData as any).result, saleId });
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

						// Add remaining additional fields
						Object.assign(body, additionalFields);

						const responseData = await hyrosApiRequest.call(this, 'POST', '/orders', body);
						returnData.push({ success: true, result: (responseData as any).result });

					} else if (operation === 'refund') {
						const orderId = this.getNodeParameter('orderId', i) as string;
						const qs: IDataObject = {};

						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						if (additionalFields.refundedAmount) {
							qs.refundedAmount = additionalFields.refundedAmount;
						}

						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/orders/${orderId}`, {}, qs);
						returnData.push({ success: true, result: (responseData as any).result, orderId });
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
						if (filters.phoneNumbers) {
							const phoneNumbers = (filters.phoneNumbers as string).split(',').map(p => p.trim());
							qs.phoneNumbers = phoneNumbers.map(p => `"${p}"`).join(',');
						}
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

						const responseData = await hyrosApiRequest.call(this, 'GET', '/calls', {}, qs);
						const calls = (responseData as any).result || [];
					returnData.push(...calls);

					} else if (operation === 'update') {
						const ids = this.getNodeParameter('ids', i) as string;
						const externalIds = this.getNodeParameter('externalIds', i) as string;
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
						const qs: IDataObject = {};

						// Validate that at least one of ids or externalIds is provided
						if (!ids && !externalIds) {
							throw new Error('Either IDs or External IDs must be provided for Call Update operation');
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
						const callId = this.getNodeParameter('callId', i) as string;
						const responseData = await hyrosApiRequest.call(this, 'DELETE', `/calls/${callId}`);
						returnData.push({ success: true, result: (responseData as any).result, callId });
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
							qs.dateTimeGroupingOption = additionalFields.dateTimeGroupingOption;
						}
						if (additionalFields.pageSize) {
							qs.pageSize = additionalFields.pageSize;
						}
						if (additionalFields.pageId) {
							qs.pageId = additionalFields.pageId;
						}

						const responseData = await hyrosApiRequest.call(this, 'GET', '/attribution/ad-account', {}, qs);
						const attribution = (responseData as any).result || [];
						returnData.push(...attribution);
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

						// GET /leads/clicks uses query parameters
						if (filters.leadId) {
							qs.leadId = filters.leadId;
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

						const responseData = await hyrosApiRequest.call(this, 'GET', '/leads/clicks', {}, qs);
						const clicks = (responseData as any).result || [];
						returnData.push(...clicks);
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
						const adgroupId = this.getNodeParameter('adgroupId', i) as string;
						const qs: IDataObject = {
							adgroupId,
						};
						const responseData = await hyrosApiRequest.call(this, 'GET', '/keywords', {}, qs);
						const keywords = (responseData as any).result || [];
						returnData.push(...keywords);
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

						const responseData = await hyrosApiRequest.call(this, 'GET', '/subscriptions', {}, qs);
						const subscriptions = (responseData as any).result || [];
						returnData.push(...subscriptions);

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
						const ids = this.getNodeParameter('ids', i) as string;
						const price = this.getNodeParameter('price', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

						const body: IDataObject = {
							ids: ids.split(',').map(id => id.trim()),
							price,
						};

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

						// Tracking script returns text/plain, not JSON
						const credentials = await this.getCredentials('hyrosApi');
						const trackingBaseUrl = (credentials.baseUrl as string).replace(/\/+$/, '');
						const options: any = {
							method: 'GET',
							qs,
							url: `${trackingBaseUrl}/api/v1.0/tracking-script`,
							json: false, // Important: response is text/plain, not JSON
						};

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
						const responseData = await hyrosApiRequest.call(this, 'GET', '/domains');
						// API returns array of domain strings, convert to objects
						const domains = (responseData as string[]).map(domain => ({ domain }));
						returnData.push(...domains);
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
				throw error;
			}
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
