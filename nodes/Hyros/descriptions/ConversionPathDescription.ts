import { INodeProperties } from 'n8n-workflow';

export const conversionPathOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversionPath'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get conversions with the ordered source touches each one was attributed with',
				action: 'Get many conversion paths',
			},
		],
		default: 'getAll',
	},
];

export const conversionPathFields: INodeProperties[] = [
	// Get Many (GET /conversion-paths)
	{
		displayName: 'Conversion Type',
		name: 'conversionType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionPath'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Call',
				value: 'CALL',
				description: 'Calls, filtered by call date; the path runs up to that date',
			},
			{
				name: 'Lead',
				value: 'LEAD',
				description: "Leads, filtered by join date; the path is the lead's full touch list",
			},
			{
				name: 'Sale',
				value: 'SALE',
				description: 'Sales, filtered by sale date; the path runs up to that date. Repeat purchases are included, firstSale tells them apart.',
			},
		],
		default: 'SALE',
		description: 'The kind of conversion to return. It also decides which date the range filters on.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['conversionPath'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['conversionPath'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 250,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['conversionPath'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Attribution Window (Days)',
				name: 'windowAttributionDaysRange',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 365,
				},
				default: 0,
				description: 'Leave out touches that happened more than this many days before the conversion. 0 means no window. It can only narrow the stored path.',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only conversions more recent than this. Cannot be in a future month.',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only conversions older than this. Cannot be in a future month.',
			},
		],
	},
];
