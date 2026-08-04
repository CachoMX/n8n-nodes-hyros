import { INodeProperties } from 'n8n-workflow';

export const adAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['adAccount'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get the ad accounts connected to Hyros',
				action: 'Get many ad accounts',
			},
		],
		default: 'getAll',
	},
];

export const adAccountFields: INodeProperties[] = [
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['adAccount'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'fields',
				type: 'string',
				default: '',
				description: 'Comma-separated fields to include per result (e.g. ID,name). Leave empty for all fields.',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated ad account IDs (max 50). Leave empty to list every connected account.',
			},
		],
	},
];
