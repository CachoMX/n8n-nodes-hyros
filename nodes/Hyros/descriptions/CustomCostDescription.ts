import { INodeProperties } from 'n8n-workflow';

export const customCostOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a custom cost entry',
				action: 'Create a custom cost',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a custom cost so it stops affecting profit and ROAS',
				action: 'Delete a custom cost',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get custom costs active in a date window',
				action: 'Get many custom costs',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Replace a custom cost',
				action: 'Update a custom cost',
			},
		],
		default: 'create',
	},
];

export const customCostFields: INodeProperties[] = [
	// Create Custom Cost (POST /custom-costs)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'A descriptive label for the cost (e.g., "Monthly Agency Fee"). Optional.',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Start date for custom cost (ISO 8601 format)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'End date for custom cost (ISO 8601 format, optional)',
	},
	{
		displayName: 'Frequency',
		name: 'frequency',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				name: 'Daily',
				value: 'DAILY',
			},
			{
				name: 'One Time',
				value: 'ONE_TIME',
			},
		],
		default: 'ONE_TIME',
		description: 'Frequency of the custom cost (DAILY or ONE_TIME per API specification)',
	},
	{
		displayName: 'Cost',
		name: 'cost',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create', 'update'],
			},
		},
		default: 0,
		description: 'Cost amount',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create', 'update'],
			},
		},
		default: [],
		description: 'Tags for attribution (max 10)',
	},
	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customCost'],
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
				resource: ['customCost'],
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
				resource: ['customCost'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only costs active on or after this date. The window filters on when the cost applies, not when it was created.',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated custom cost IDs (max 50)',
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
				description: 'Only costs active on or before this date',
			},
		],
	},

	// ------ Update / Delete ------
	{
		displayName: 'Custom Cost ID',
		name: 'customCostId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['update', 'delete'],
			},
		},
		default: '',
		description: 'ID of the custom cost, as returned by Get Many',
	},
];
