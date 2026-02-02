import { INodeProperties } from 'n8n-workflow';

export const clickOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['click'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a click event',
				action: 'Create a click',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get clicks for a lead',
				action: 'Get clicks',
			},
		],
		default: 'create',
	},
];

export const clickFields: INodeProperties[] = [
	// Create Click (POST /clicks)
	{
		displayName: 'Referrer URL',
		name: 'referrerUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['click'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The URL for the click (required)',
	},
	// Get Clicks (GET /leads/clicks with query params)
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['click'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Lead ID',
				name: 'leadId',
				type: 'string',
				default: '',
				description: 'Filter by lead ID (mutually exclusive with email)',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by email (mutually exclusive with leadId)',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 50,
				description: 'Maximum number of clicks per page (0-250)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'Page ID for pagination (from nextPageId in response)',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only clicks after this date (ISO 8601 format)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only clicks before this date (ISO 8601 format)',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['click'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Session ID',
				name: 'sessionId',
				type: 'string',
				default: '',
				description: 'String representing the lead session (unique for every lead/session)',
			},
			{
				displayName: 'Previous URL',
				name: 'previousUrl',
				type: 'string',
				default: '',
				description: 'URL the lead was navigating before making the click',
			},
			{
				displayName: 'User Agent',
				name: 'userAgent',
				type: 'string',
				default: '',
				description: 'String representing the web browser the lead uses',
			},
			{
				displayName: 'IP',
				name: 'ip',
				type: 'string',
				default: '',
				description: 'IP address the click comes from (important for matching clicks to leads)',
			},
			{
				displayName: 'Source Link Tag',
				name: 'sourceLinkTag',
				type: 'string',
				default: '',
				description: 'Tag representing the ad (must start with @). Used for organic ads',
			},
			{
				displayName: 'Is Organic',
				name: 'isOrganic',
				type: 'boolean',
				default: false,
				description: 'Whether the ad the click comes from is organic',
			},
			{
				displayName: 'Integration Type',
				name: 'integrationType',
				type: 'options',
				options: [
					{ name: 'Facebook', value: 'FACEBOOK' },
					{ name: 'Google', value: 'GOOGLE' },
					{ name: 'TikTok', value: 'TIKTOK' },
					{ name: 'Snapchat', value: 'SNAPCHAT' },
					{ name: 'LinkedIn', value: 'LINKEDIN' },
					{ name: 'Twitter', value: 'TWITTER' },
					{ name: 'Pinterest', value: 'PINTEREST' },
					{ name: 'Bing', value: 'BING' },
				],
				default: 'FACEBOOK',
				description: 'Platform the ad that generated the click belongs to',
			},
			{
				displayName: 'Ad Source ID',
				name: 'adSourceId',
				type: 'string',
				default: '',
				description: 'ID of the group of ads in the platform (required if integrationType is present)',
			},
			{
				displayName: 'Adspend Ad ID',
				name: 'adspendAdId',
				type: 'string',
				default: '',
				description: 'ID of the ad in the ad platform (for Facebook and Google)',
			},
			{
				displayName: 'Ad Source Click ID',
				name: 'adSourceClickId',
				type: 'string',
				default: '',
				description: 'ID of the click in the ad platform (for offline conversions)',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email for the lead that generated the click',
			},
			{
				displayName: 'Phones',
				name: 'phones',
				type: 'string',
				default: '',
				description: 'Comma-separated phone numbers for the lead',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Tag to apply to the lead that generated the click',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date where the click was made (ISO 8601 format)',
			},
		],
	},
];
