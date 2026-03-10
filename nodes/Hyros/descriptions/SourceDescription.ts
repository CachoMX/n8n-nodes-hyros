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
				name: 'Create',
				value: 'create',
				description: 'Create a new source',
				action: 'Create a source',
			},
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
	// ------ Create fields ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the source',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'Account ID (required if Integration Type is set)',
			},
			{
				displayName: 'Ad Source ID',
				name: 'adSourceId',
				type: 'string',
				default: '',
				description: 'Ad source ID (required if Integration Type is set)',
			},
			{
				displayName: 'Adspend Sub Type',
				name: 'adspendSubType',
				type: 'options',
				options: [
					{
						name: 'Display',
						value: 'DISPLAY',
					},
					{
						name: 'Video',
						value: 'VIDEO',
					},
				],
				default: 'DISPLAY',
				description: 'Adspend sub type (required if Integration Type is GOOGLE)',
			},
			{
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				default: '',
				description: 'Campaign ID (required if Integration Type is FACEBOOK)',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Name of the category',
			},
			{
				displayName: 'Goal',
				name: 'goal',
				type: 'string',
				default: '',
				description: 'Name of the goal',
			},
			{
				displayName: 'Integration Type',
				name: 'integrationType',
				type: 'options',
				options: [
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
						name: 'LinkedIn',
						value: 'LINKEDIN',
					},
					{
						name: 'Pinterest',
						value: 'PINTEREST',
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
				],
				default: 'FACEBOOK',
				description: 'Provider of the source',
			},
			{
				displayName: 'Is Disregard',
				name: 'isDisregard',
				type: 'boolean',
				default: false,
				description: 'Whether the source is disregarded in attribution',
			},
			{
				displayName: 'Is Organic',
				name: 'isOrganic',
				type: 'boolean',
				default: false,
				description: 'Whether the source is organic',
			},
			{
				displayName: 'Traffic Source',
				name: 'trafficSource',
				type: 'string',
				default: '',
				description: 'Name of the traffic source',
			},
		],
	},
	// ------ GetAll fields ------
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
