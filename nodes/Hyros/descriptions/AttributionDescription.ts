import { INodeProperties } from 'n8n-workflow';

export const attributionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
			},
		},
		options: [
			{
				name: 'Get Ads Report',
				value: 'getAdsReport',
				description: 'Get attribution report for ads',
				action: 'Get ads attribution report',
			},
			{
				name: 'Get Ad Account Report',
				value: 'getAdAccountReport',
				description: 'Get attribution report for ad accounts',
				action: 'Get ad account attribution report',
			},
		],
		default: 'getAdsReport',
	},
];

export const attributionFields: INodeProperties[] = [
	// Get Ads Report
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
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
		displayName: 'Level',
		name: 'level',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport'],
			},
		},
		options: [
			{
				name: 'Campaigns',
				value: 'campaigns',
			},
			{
				name: 'Adsets',
				value: 'adsets',
			},
			{
				name: 'Ads',
				value: 'ads',
			},
			{
				name: 'Keywords',
				value: 'keywords',
			},
			{
				name: 'Placements',
				value: 'placements',
			},
			{
				name: 'Devices',
				value: 'devices',
			},
			{
				name: 'Ages',
				value: 'ages',
			},
			{
				name: 'Genders',
				value: 'genders',
			},
			{
				name: 'Locations',
				value: 'locations',
			},
			{
				name: 'Publishers',
				value: 'publishers',
			},
			{
				name: 'Ad Positions',
				value: 'ad_positions',
			},
			{
				name: 'Landing Pages',
				value: 'landing_pages',
			},
			{
				name: 'Creatives',
				value: 'creatives',
			},
			{
				name: 'Ad Types',
				value: 'ad_types',
			},
			{
				name: 'Video Views',
				value: 'video_views',
			},
			{
				name: 'Interests',
				value: 'interests',
			},
		],
		default: 'campaigns',
		description: 'The attribution level to report on',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
			},
		},
		default: '',
		description: 'Start date for the report (ISO 8601 format)',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
			},
		},
		default: '',
		description: 'End date for the report (ISO 8601 format)',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
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
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
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
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
			},
		},
		options: [
			{
				displayName: 'Attribution Model',
				name: 'attributionModel',
				type: 'options',
				options: [
					{
						name: 'Last Click',
						value: 'last_click',
					},
					{
						name: 'Scientific',
						value: 'scientific',
					},
					{
						name: 'First Click',
						value: 'first_click',
					},
				],
				default: 'last_click',
				description: 'The attribution model to use',
			},
			{
				displayName: 'Metrics',
				name: 'metrics',
				type: 'multiOptions',
				options: [
					{ name: 'Ad Spend', value: 'ad_spend' },
					{ name: 'Impressions', value: 'impressions' },
					{ name: 'Clicks', value: 'clicks' },
					{ name: 'CTR', value: 'ctr' },
					{ name: 'CPC', value: 'cpc' },
					{ name: 'CPM', value: 'cpm' },
					{ name: 'Leads', value: 'leads' },
					{ name: 'Cost Per Lead', value: 'cost_per_lead' },
					{ name: 'Sales', value: 'sales' },
					{ name: 'Revenue', value: 'revenue' },
					{ name: 'ROAS', value: 'roas' },
					{ name: 'ROI', value: 'roi' },
					{ name: 'Profit', value: 'profit' },
					{ name: 'Cost Per Sale', value: 'cost_per_sale' },
					{ name: 'Conversion Rate', value: 'conversion_rate' },
					{ name: 'AOV', value: 'aov' },
					{ name: 'LTV', value: 'ltv' },
					{ name: 'LTV 30', value: 'ltv_30' },
					{ name: 'LTV 60', value: 'ltv_60' },
					{ name: 'LTV 90', value: 'ltv_90' },
					{ name: 'LTV 180', value: 'ltv_180' },
					{ name: 'LTV 365', value: 'ltv_365' },
					{ name: 'Calls', value: 'calls' },
					{ name: 'Call Revenue', value: 'call_revenue' },
					{ name: 'Subscriptions', value: 'subscriptions' },
					{ name: 'MRR', value: 'mrr' },
					{ name: 'Churn Rate', value: 'churn_rate' },
				],
				default: [],
				description: 'Metrics to include in the report',
			},
			{
				displayName: 'Timezone',
				name: 'timezone',
				type: 'string',
				default: 'UTC',
				description: 'Timezone for date filtering (e.g., America/New_York)',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code for monetary values',
			},
			{
				displayName: 'Group By',
				name: 'groupBy',
				type: 'string',
				default: '',
				description: 'Additional grouping dimension',
			},
			{
				displayName: 'Filter',
				name: 'filter',
				type: 'json',
				default: '{}',
				description: 'Filter criteria as JSON object',
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
