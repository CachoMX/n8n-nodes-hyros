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
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['click'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email address of the user',
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
				description: 'Filter by lead ID',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by email',
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
				displayName: 'Click ID',
				name: 'clickId',
				type: 'string',
				default: '',
				description: 'Custom click ID (auto-generated if not provided)',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Traffic source',
			},
			{
				displayName: 'Sub Source',
				name: 'subSource',
				type: 'string',
				default: '',
				description: 'Sub source for granular tracking',
			},
			{
				displayName: 'Campaign',
				name: 'campaign',
				type: 'string',
				default: '',
				description: 'Campaign name',
			},
			{
				displayName: 'Adset',
				name: 'adset',
				type: 'string',
				default: '',
				description: 'Adset name',
			},
			{
				displayName: 'Ad',
				name: 'ad',
				type: 'string',
				default: '',
				description: 'Ad name',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				default: '',
				description: 'Keyword',
			},
			{
				displayName: 'Placement',
				name: 'placement',
				type: 'string',
				default: '',
				description: 'Ad placement',
			},
			{
				displayName: 'Device',
				name: 'device',
				type: 'string',
				default: '',
				description: 'Device type',
			},
			{
				displayName: 'Landing Page',
				name: 'landingPage',
				type: 'string',
				default: '',
				description: 'Landing page URL',
			},
			{
				displayName: 'Referrer',
				name: 'referrer',
				type: 'string',
				default: '',
				description: 'Referrer URL',
			},
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				default: '',
				description: 'IP address',
			},
			{
				displayName: 'User Agent',
				name: 'userAgent',
				type: 'string',
				default: '',
				description: 'User agent string',
			},
			{
				displayName: 'FB Click ID',
				name: 'fbclid',
				type: 'string',
				default: '',
				description: 'Facebook click ID',
			},
			{
				displayName: 'Google Click ID',
				name: 'gclid',
				type: 'string',
				default: '',
				description: 'Google click ID',
			},
			{
				displayName: 'TikTok Click ID',
				name: 'ttclid',
				type: 'string',
				default: '',
				description: 'TikTok click ID',
			},
			{
				displayName: 'HY ID',
				name: 'hyId',
				type: 'string',
				default: '',
				description: 'Hyros tracking ID',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'json',
				default: '{}',
				description: 'Custom fields as JSON object',
			},
			{
				displayName: 'Timestamp',
				name: 'timestamp',
				type: 'dateTime',
				default: '',
				description: 'Click timestamp (ISO 8601 format)',
			},
		],
	},
];
