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
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by customer email',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter sales after this date (ISO 8601 format)',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter sales before this date (ISO 8601 format)',
			},
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				default: '',
				description: 'Filter by product ID',
			},
			{
				displayName: 'Order Number',
				name: 'orderNumber',
				type: 'string',
				default: '',
				description: 'Filter by order number',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Filter by traffic source',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter by tag',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
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
