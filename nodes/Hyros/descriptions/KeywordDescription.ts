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
				description: 'Get keyword information',
				action: 'Get a keyword',
			},
		],
		default: 'get',
	},
];

export const keywordFields: INodeProperties[] = [
	{
		displayName: 'Keyword ID',
		name: 'keywordId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['keyword'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The keyword identifier',
	},
];
