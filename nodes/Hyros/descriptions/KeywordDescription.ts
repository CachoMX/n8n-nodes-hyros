import { INodeProperties } from 'n8n-workflow';

export const keywordOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['keyword'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get keywords by ad group',
				action: 'Get keywords',
			},
		],
		default: 'get',
	},
];

export const keywordFields: INodeProperties[] = [
	// Get Keywords (GET /keywords with query param)
	{
		displayName: 'Ad Group ID',
		name: 'adgroupId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['keyword'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'Google Ad Group ID to filter by. Leave empty to list all keywords.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['keyword'],
				operation: ['get'],
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
				resource: ['keyword'],
				operation: ['get'],
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
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['keyword'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
		],
	},
];
