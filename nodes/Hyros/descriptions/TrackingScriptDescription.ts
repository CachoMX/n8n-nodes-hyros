import { INodeProperties } from 'n8n-workflow';

export const trackingScriptOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['trackingScript'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get the tracking script for a domain',
				action: 'Get tracking script',
			},
		],
		default: 'get',
	},
];

export const trackingScriptFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['trackingScript'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'The domain for which to retrieve the tracking script. If not provided, the default tracking script will be returned.',
			},
		],
	},
];
