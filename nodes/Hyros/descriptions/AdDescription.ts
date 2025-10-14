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
				description: 'Get all ads for a platform',
				action: 'Get all ads',
			},
		],
		default: 'getAll',
	},
];

export const adFields: INodeProperties[] = [
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ad'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				name: 'Facebook',
				value: 'facebook',
			},
			{
				name: 'Google',
				value: 'google',
			},
			{
				name: 'TikTok',
				value: 'tiktok',
			},
			{
				name: 'Snapchat',
				value: 'snapchat',
			},
			{
				name: 'LinkedIn',
				value: 'linkedin',
			},
			{
				name: 'Twitter',
				value: 'twitter',
			},
			{
				name: 'Pinterest',
				value: 'pinterest',
			},
			{
				name: 'Bing',
				value: 'bing',
			},
		],
		default: 'facebook',
		description: 'The advertising platform',
	},
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
				displayName: 'Campaign ID',
				name: 'campaignId',
				type: 'string',
				default: '',
				description: 'Filter by campaign ID',
			},
			{
				displayName: 'Adset ID',
				name: 'adsetId',
				type: 'string',
				default: '',
				description: 'Filter by adset ID',
			},
			{
				displayName: 'Ad ID',
				name: 'adId',
				type: 'string',
				default: '',
				description: 'Filter by ad ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Paused',
						value: 'paused',
					},
					{
						name: 'Deleted',
						value: 'deleted',
					},
					{
						name: 'Archived',
						value: 'archived',
					},
				],
				default: 'active',
				description: 'Filter by ad status',
			},
			{
				displayName: 'Page',
				name: 'page',
				type: 'number',
				default: 1,
				description: 'Page number for pagination',
			},
		],
	},
];
