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
				name: 'Get Ads Attribution Report',
				value: 'getAdsReport',
				description: 'Retrieves the required Facebook AdSet or Google Campaign attribution information',
				action: 'Get ads attribution report',
			},
			{
				name: 'Get Ad Account Attribution Report',
				value: 'getAdAccountReport',
				description: 'Retrieves the required Ad account attribution information',
				action: 'Get ad account attribution report',
			},
		],
		default: 'getAdsReport',
	},
];

export const attributionFields: INodeProperties[] = [
	// Common required fields for both operations
	{
		displayName: 'Attribution Model',
		name: 'attributionModel',
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
		description: 'The attribution model, one per request',
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
		description: 'The starting date to be taken to retrieve the attribution information (ISO 8601 format)',
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
		description: 'The ending date to be taken to retrieve the attribution information (ISO 8601 format)',
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
				name: 'Google Campaign',
				value: 'google_campaign',
			},
			{
				name: 'Google V2 AdGroup',
				value: 'google_v2_adgroup',
				description: 'Only available for Google v2 integration',
			},
			{
				name: 'Google Ad',
				value: 'google_ad',
			},
			{
				name: 'Google V2 Keyword',
				value: 'google_v2_keyword',
				description: 'Only available for Google v2 integration',
			},
			{
				name: 'Facebook AdSet',
				value: 'facebook_adset',
			},
			{
				name: 'TikTok AdGroup',
				value: 'tiktok_adgroup',
			},
			{
				name: 'Snapchat AdSquad',
				value: 'snapchat_adsquad',
			},
			{
				name: 'Pinterest AdGroup',
				value: 'pinterest_adgroup',
			},
			{
				name: 'Twitter AdGroup',
				value: 'twitter_adgroup',
			},
			{
				name: 'Bing AdGroup',
				value: 'bing_adgroup',
			},
			{
				name: 'LinkedIn Campaign',
				value: 'linkedin_campaign',
			},
			{
				name: 'Facebook Ad',
				value: 'facebook_ad',
			},
			{
				name: 'TikTok Ad',
				value: 'tiktok_ad',
			},
			{
				name: 'Snapchat Ad',
				value: 'snapchat_ad',
			},
			{
				name: 'Pinterest Ad',
				value: 'pinterest_ad',
			},
			{
				name: 'Bing Ad',
				value: 'bing_ad',
			},
		],
		default: 'facebook_adset',
		description: 'Attribution level to be considered for the report',
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
			},
		},
		options: [
			{ name: 'Sales', value: 'sales' },
			{ name: 'Revenue', value: 'revenue' },
			{ name: 'Calls', value: 'calls' },
			{ name: 'Total Revenue', value: 'total_revenue' },
			{ name: 'Recurring Revenue', value: 'recurring_revenue' },
			{ name: 'Refund', value: 'refund' },
			{ name: 'Unique Sales', value: 'unique_sales' },
			{ name: 'Leads', value: 'leads' },
			{ name: 'New Leads', value: 'new_leads' },
			{ name: 'Cost', value: 'cost' },
			{ name: 'Profit', value: 'profit' },
			{ name: 'ROI', value: 'roi' },
			{ name: 'ROAS', value: 'roas' },
			{ name: 'Refund Count', value: 'refund_count' },
			{ name: 'Refund Sales Percentage', value: 'refund_sales_percentage' },
			{ name: 'Refund Revenue Percentage', value: 'refund_revenue_percentage' },
			{ name: 'Cost Per Call', value: 'cost_per_call' },
			{ name: 'Cost Per Lead', value: 'cost_per_lead' },
			{ name: 'Cost Per Sale', value: 'cost_per_sale' },
			{ name: 'Cost Per New Lead', value: 'cost_per_new_lead' },
			{ name: 'Cost Per Unique Sale', value: 'cost_per_unique_sale' },
			{ name: 'Unique Customers', value: 'unique_customers' },
			{ name: 'Unique Customers Revenue', value: 'unique_customers_revenue' },
			{ name: 'Cost Per Unique Customer', value: 'cost_per_unique_customer' },
			{ name: 'Net Profit', value: 'net_profit' },
			{ name: 'Hard Costs', value: 'hard_costs' },
			{ name: 'Qualified Calls', value: 'qualified_calls' },
			{ name: 'Unqualified Calls', value: 'unqualified_calls' },
			{ name: 'Cost Per Qualified Call', value: 'cost_per_qualified_call' },
			{ name: 'Time of Sale Attribution', value: 'time_of_sale_attribution' },
			{ name: 'Time of Call Attribution', value: 'time_of_call_attribution' },
			{ name: 'Clicks', value: 'clicks' },
			{ name: 'New Visits', value: 'new_visits' },
			{ name: 'Cost Per New Visit', value: 'cost_per_new_visit' },
			{ name: 'Cost Per Click', value: 'cost_per_click' },
			{ name: 'Reported', value: 'reported' },
			{ name: 'Reported Result', value: 'reported_result' },
			{ name: 'Shop Reported Result', value: 'shop_reported_result' },
			{ name: 'Reported vs Revenue', value: 'reported_vs_revenue' },
			{ name: 'New Customers Percentage', value: 'new_customers_percentage' },
			{ name: 'Recurring Customers', value: 'recurring_customers' },
			{ name: 'Total Customers', value: 'total_customers' },
			{ name: 'Customers', value: 'customers' },
			{ name: 'CTR', value: 'ctr' },
			{ name: 'CPM', value: 'cpm' },
			{ name: 'CVR', value: 'cvr' },
			{ name: 'Impressions', value: 'impressions' },
			{ name: 'Gross Margins', value: 'gross_margins' },
			{ name: 'Partial Video Views', value: 'partial_video_views' },
			{ name: 'Unique Calls', value: 'unique_calls' },
			{ name: 'Canceled Calls', value: 'canceled_calls' },
			{ name: 'Cost Per Unique Call', value: 'cost_per_unique_call' },
			{ name: 'Net Profit Percentage', value: 'net_profit_percentage' },
			{ name: 'Taxes', value: 'taxes' },
			{ name: 'Cost of Goods', value: 'cost_of_goods' },
			{ name: 'Shipping Value', value: 'shipping_value' },
			{ name: '30 Days LTV', value: '30_days_ltv' },
			{ name: '60 Days LTV', value: '60_days_ltv' },
			{ name: '90 Days LTV', value: '90_days_ltv' },
			{ name: '6 Months LTV', value: '6_months_ltv' },
			{ name: '1 Year LTV', value: '1_year_ltv' },
			{ name: '30 Days LTV Forecast', value: '30_days_ltv_forecast' },
			{ name: '60 Days LTV Forecast', value: '60_days_ltv_forecast' },
			{ name: '90 Days LTV Forecast', value: '90_days_ltv_forecast' },
			{ name: '6 Months LTV Forecast', value: '6_months_ltv_forecast' },
			{ name: '1 Year LTV Forecast', value: '1_year_ltv_forecast' },
			{ name: 'Churn Rate', value: 'churn_rate' },
			{ name: 'One Time Sales', value: 'one_time_sales' },
			{ name: 'Subscription 30 Days Forecast', value: 'subscription_30_days_forecast' },
			{ name: 'Subscription 60 Days Forecast', value: 'subscription_60_days_forecast' },
			{ name: 'Subscription 90 Days Forecast', value: 'subscription_90_days_forecast' },
			{ name: 'Subscription 6 Months Forecast', value: 'subscription_6_months_forecast' },
			{ name: 'Subscription 1 Year Forecast', value: 'subscription_1_year_forecast' },
			{ name: 'CAC', value: 'cac' },
			{ name: 'AOV', value: 'aov' },
			{ name: 'New Subscriptions', value: 'new_subscriptions' },
			{ name: 'Canceled Subscriptions', value: 'canceled_subscriptions' },
			{ name: 'Direct Subscriptions', value: 'direct_subscriptions' },
			{ name: 'New MRR', value: 'new_mrr' },
			{ name: 'New Trials', value: 'new_trials' },
			{ name: 'Converted Trials', value: 'converted_trials' },
			{ name: 'Canceled Trials', value: 'canceled_trials' },
			{ name: 'Cost Per New Subscriptions', value: 'cost_per_new_subscriptions' },
			{ name: 'Cost Per New Trials', value: 'cost_per_new_trials' },
			{ name: 'Carts', value: 'carts' },
			{ name: 'ATC Events', value: 'atc_events' },
			{ name: 'Purchased Carts', value: 'purchased_carts' },
			{ name: 'ATC CVR', value: 'atc_cvr' },
			{ name: 'ATC Rate', value: 'atc_rate' },
			{ name: 'Cost Per ATC', value: 'cost_per_atc' },
			{ name: 'Name', value: 'name' },
			{ name: 'Parent Name', value: 'parent_name' },
		],
		default: ['sales', 'revenue', 'cost'],
		description: 'Fields to indicate the information you want to obtain from the report',
	},
	{
		displayName: 'IDs',
		name: 'ids',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
			},
		},
		default: '',
		description: 'Based on level, IDs of which you want to retrieve information, separated by comma. For example, if your level is facebook_ad, then place the ad id here. For getAdAccountReport, only 1 ID is permitted.',
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
				displayName: 'Keywords IDs',
				name: 'keywordsIds',
				type: 'string',
				default: '',
				description: 'Map of ad group ids (in the case of Google ads) and keywords for which you want to retrieve information. Example: 66457534290:[391764277422,10000010],76590307372:[10000010]',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'options',
				options: [
					{
						name: 'USD',
						value: 'usd',
					},
					{
						name: 'User Currency',
						value: 'user_currency',
					},
				],
				default: 'user_currency',
				description: 'The currency to be considered for the report',
			},
			{
				displayName: 'Day of Attribution',
				name: 'dayOfAttribution',
				type: 'boolean',
				default: false,
				description: 'Whether the date range will be used to filter sales within the range (false) or if it will be used to filter the clicks that ended up triggering them',
			},
			{
				displayName: 'Scientific Days Range',
				name: 'scientificDaysRange',
				type: 'number',
				default: 30,
				description: 'Day range (1-30) for first ad attribution (used for scientific attribution)',
				typeOptions: {
					minValue: 1,
					maxValue: 30,
				},
			},
			{
				displayName: 'Source Configuration',
				name: 'sourceConfiguration',
				type: 'options',
				options: [
					{
						name: 'All Sources',
						value: 'all_sources',
					},
					{
						name: 'Only Organic',
						value: 'only_organic',
					},
					{
						name: 'Only Paid',
						value: 'only_paid',
					},
					{
						name: 'Prioritize Organic',
						value: 'prioritize_organic',
					},
					{
						name: 'Prioritize Paid',
						value: 'prioritize_paid',
					},
				],
				default: 'all_sources',
				description: 'Field to select the filter related with the organic sources that you want from the report',
			},
			{
				displayName: 'Ignore Recurring Sales',
				name: 'ignoreRecurringSales',
				type: 'boolean',
				default: false,
				description: 'Whether the response will include or exclude recurring sales',
			},
			{
				displayName: 'Is Ad Account ID',
				name: 'isAdAccountId',
				type: 'boolean',
				default: false,
				description: 'Whether the id placed in ids should be the ad account ID. All sources of the ad account will be included in the response, depending on the selected level.',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
			},
			{
				displayName: 'Forecasting Option',
				name: 'forecastingOption',
				type: 'options',
				options: [
					{
						name: 'First Sale',
						value: 'first_sale',
					},
					{
						name: 'Total Sales',
						value: 'total_sales',
					},
				],
				default: 'first_sale',
				description: 'This setting defines the way the LTV Forecast metric is calculated, either forecasting by using the first sale of a customer or attempting to use all of them',
			},
			{
				displayName: 'Window Attribution Days Range',
				name: 'windowAttributionDaysRange',
				type: 'number',
				default: 0,
				description: 'Days range for discard attribution (0-365)',
				typeOptions: {
					minValue: 0,
					maxValue: 365,
				},
			},
			{
				displayName: 'New Customer Configuration',
				name: 'newCustomerConfiguration',
				type: 'options',
				options: [
					{
						name: 'All Customers',
						value: 'all_customers',
					},
					{
						name: 'Only Returning Customers',
						value: 'only_returning_customers',
					},
					{
						name: 'Only Unique Customers',
						value: 'only_unique_customers',
					},
				],
				default: 'all_customers',
				description: 'Field to select the filter related with the new customer configuration you want from the report',
			},
			{
				displayName: 'Date Time Grouping Option',
				name: 'dateTimeGroupingOption',
				type: 'options',
				options: [
					{
						name: 'Ad Account',
						value: 'ad_account',
					},
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Week',
						value: 'week',
					},
					{
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
				default: 'ad_account',
				description: 'Defines how the response will be grouped',
				displayOptions: {
					show: {
						'/operation': ['getAdAccountReport'],
					},
				},
			},
		],
	},
];
