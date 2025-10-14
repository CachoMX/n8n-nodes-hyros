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
		],
		default: 'create',
	},
];

export const customCostFields: INodeProperties[] = [
	// Create Custom Cost (POST /custom-costs)
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Start date for custom cost (ISO 8601 format)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'End date for custom cost (ISO 8601 format)',
	},
	{
		displayName: 'Frequency',
		name: 'frequency',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Daily',
				value: 'daily',
			},
			{
				name: 'Weekly',
				value: 'weekly',
			},
			{
				name: 'Monthly',
				value: 'monthly',
			},
			{
				name: 'One Time',
				value: 'one_time',
			},
		],
		default: 'one_time',
		description: 'Frequency of the custom cost',
	},
	{
		displayName: 'Cost',
		name: 'cost',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create'],
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
				operation: ['create'],
			},
		},
		default: [],
		description: 'Tags for attribution (max 20)',
	},
];
