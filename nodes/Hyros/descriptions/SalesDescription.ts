import { INodeProperties } from 'n8n-workflow';

export const salesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sales'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all sales with optional filtering',
				action: 'Get all sales',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a sale',
				action: 'Update a sale',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a sale',
				action: 'Delete a sale',
			},
		],
		default: 'getAll',
	},
];

export const salesFields: INodeProperties[] = [
	// Get All Sales
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['sales'],
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
				resource: ['sales'],
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
				resource: ['sales'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of sales IDs to be retrieved (max 50)',
			},
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				default: '',
				description: 'Comma-separated list of emails or email prefixes to search sales by (max 50)',
			},
			// Lead IDs parameter disabled - Hyros API expects internal numeric IDs that are not exposed
			// The hash IDs returned by the API (e.g., "2c761e9199b96efbe...") do not work with this parameter
			// Use 'emails' parameter instead to filter sales by lead
			// {
			// 	displayName: 'Lead IDs',
			// 	name: 'leadIds',
			// 	type: 'string',
			// 	default: '',
			// 	description: 'Comma-separated list of lead IDs to search sales by (max 50)',
			// },
			{
				displayName: 'Product Tags',
				name: 'productTags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of product tags to search sales by (max 20)',
			},
			{
				displayName: 'Is Recurring Sale',
				name: 'isRecurringSale',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'ALL',
					},
					{
						name: 'Recurring',
						value: 'RECURRING',
					},
					{
						name: 'Non-Recurring',
						value: 'NON_RECURRING',
					},
				],
				default: 'ALL',
				description: 'Indicates if the sales to search are recurring, non-recurring or both',
			},
			{
				displayName: 'Sale Refunded State',
				name: 'saleRefundedState',
				type: 'options',
				options: [
					{
						name: 'All',
						value: 'ALL',
					},
					{
						name: 'Refunded',
						value: 'REFUNDED',
					},
					{
						name: 'Non-Refunded',
						value: 'NON_REFUNDED',
					},
				],
				default: 'ALL',
				description: 'Indicates if the sales to search are refunded, non-refunded or both',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only sales whose join date is more recent than this will be retrieved (ISO 8601 format)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only sales whose join date is older than this will be retrieved (ISO 8601 format)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
		],
	},
	// Update Sale (PUT /sales with query params)
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['sales'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated sale IDs to update',
			},
			{
				displayName: 'Is Recurring Sale',
				name: 'isRecurringSale',
				type: 'boolean',
				default: false,
				description: 'Whether this is a recurring sale',
			},
			{
				displayName: 'Is Refunded',
				name: 'isRefunded',
				type: 'boolean',
				default: false,
				description: 'Whether this sale is refunded',
			},
			{
				displayName: 'Refunded Date',
				name: 'refundedDate',
				type: 'dateTime',
				default: '',
				description: 'Date when sale was refunded (ISO 8601 format)',
			},
			{
				displayName: 'Refunded Amount',
				name: 'refundedAmount',
				type: 'number',
				default: 0,
				description: 'Amount refunded',
			},
		],
	},
	// Delete Sale
	{
		displayName: 'Sale ID',
		name: 'saleId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sales'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'The ID of the sale to delete',
	},
];
