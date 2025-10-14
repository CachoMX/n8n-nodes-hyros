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
		required: true,
		displayOptions: {
			show: {
				resource: ['keyword'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The ad group identifier',
	},
];
