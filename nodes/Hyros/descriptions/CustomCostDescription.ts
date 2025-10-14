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
	{
		displayName: 'Source',
		name: 'source',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Source name for the custom cost',
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['customCost'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Date for the cost entry (ISO 8601 format, YYYY-MM-DD)',
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
];
