import { INodeProperties } from 'n8n-workflow';

export const adOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ad'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many ads for a platform',
				action: 'Get many ads',
			},
		],
		default: 'getAll',
	},
];

export const adFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['ad'],
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
				resource: ['ad'],
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
				resource: ['ad'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Integration Type',
				name: 'integrationType',
				type: 'options',
				options: [
					{
						name: 'AppLovin',
						value: 'APPLOVIN',
					},
					{
						name: 'Bing',
						value: 'BING',
					},
					{
						name: 'Facebook',
						value: 'FACEBOOK',
					},
					{
						name: 'Google',
						value: 'GOOGLE',
					},
					{
						name: 'Google V2',
						value: 'GOOGLE_V2',
					},
					{
						name: 'LinkedIn',
						value: 'LINKEDIN',
					},
					{
						name: 'Pinterest',
						value: 'PINTEREST',
					},
					{
						name: 'Reddit',
						value: 'REDDIT',
					},
					{
						name: 'Snapchat',
						value: 'SNAPCHAT',
					},
					{
						name: 'TikTok',
						value: 'TIKTOK',
					},
					{
						name: 'Twitter',
						value: 'TWITTER',
					},
					{
						name: 'Whop Ads',
						value: 'WHOP_ADS',
					},
				],
				default: 'FACEBOOK',
				description: 'Provider of the source IDs',
			},
			{
				displayName: 'Ad Source IDs',
				name: 'adSourceIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of ad source IDs of the sources to be retrieved',
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
