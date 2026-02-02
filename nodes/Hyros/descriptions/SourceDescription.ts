import { INodeProperties } from 'n8n-workflow';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all sources',
				action: 'Get all sources',
			},
		],
		default: 'getAll',
	},
];

export const sourceFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['source'],
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
				resource: ['source'],
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
				resource: ['source'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Ad Source IDs',
				name: 'adSourceIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of ad source IDs of the sources to be retrieved',
			},
			{
				displayName: 'Include Organic',
				name: 'includeOrganic',
				type: 'boolean',
				default: true,
				description: 'Whether to include organic sources in the response',
			},
			{
				displayName: 'Include Disregarded',
				name: 'includeDisregarded',
				type: 'boolean',
				default: false,
				description: 'Whether to include disregarded sources in the response',
			},
			{
				displayName: 'Integration Type',
				name: 'integrationType',
				type: 'options',
				options: [
					{
						name: 'Facebook',
						value: 'FACEBOOK',
					},
					{
						name: 'Google',
						value: 'GOOGLE',
					},
					{
						name: 'TikTok',
						value: 'TIKTOK',
					},
					{
						name: 'Snapchat',
						value: 'SNAPCHAT',
					},
					{
						name: 'LinkedIn',
						value: 'LINKEDIN',
					},
					{
						name: 'Twitter',
						value: 'TWITTER',
					},
					{
						name: 'Pinterest',
						value: 'PINTEREST',
					},
					{
						name: 'Bing',
						value: 'BING',
					},
				],
				default: 'FACEBOOK',
				description: 'Provider of the source ids',
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
];
