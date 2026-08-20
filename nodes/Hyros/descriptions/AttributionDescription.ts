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
				name: 'Get Ad Account Attribution Report',
				value: 'getAdAccountReport',
				description: 'Retrieves the required Ad account attribution information',
				action: 'Get ad account attribution report',
			},
			{
				name: 'Get Ads Attribution Report',
				value: 'getAdsReport',
				description: 'Retrieves the required Facebook AdSet or Google Campaign attribution information',
				action: 'Get ads attribution report',
			},
			{
				name: 'Get Marginal CAC Curve',
				value: 'getMarginalCacCurve',
				description: 'Compute the marginal cost of acquiring the next customer at every observed daily spend level, and the spend level past which the next dollar is wasted',
				action: 'Get marginal CAC curve',
			},
			{
				name: 'Get ROAS',
				value: 'getRoas',
				description: 'Get the cash collected by a single ad, ad set, campaign or account against its ad spend (always measured under last click)',
				action: 'Get ROAS',
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
				operation: ['getAdsReport', 'getAdAccountReport', 'getRoas'],
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
				operation: ['getAdsReport', 'getAdAccountReport', 'getRoas'],
			},
		},
		default: '',
		description: 'The ending date to be taken to retrieve the attribution information (ISO 8601 format)',
	},
	// ROAS and Marginal CAC Curve report on a single entity
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getRoas', 'getMarginalCacCurve'],
			},
		},
		default: '',
		description: 'ID of the entity to report on, as the ad platform issues it. It must belong to the given Level.',
	},
	{
		displayName: 'Level',
		name: 'entityLevel',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getRoas', 'getMarginalCacCurve'],
			},
		},
		options: [
			{
				name: 'Account',
				value: 'account',
				description: 'A whole ad account',
			},
			{
				name: 'Ad',
				value: 'ad',
				description: 'A single ad',
			},
			{
				name: 'Campaign',
				value: 'campaign',
				description: 'A campaign, whose contained ads are resolved and aggregated. Available on Meta, Google and LinkedIn.',
			},
			{
				name: 'Source Link',
				value: 'source_link',
				description: 'An ad set on Meta, an ad group elsewhere. The level most tracked data sits at.',
			},
		],
		default: 'source_link',
		description: 'Granularity the Entity ID refers to',
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
				name: 'Bing Ad',
				value: 'bing_ad',
			},
			{
				name: 'Bing AdGroup',
				value: 'bing_adgroup',
			},
			{
				name: 'Facebook Ad',
				value: 'facebook_ad',
			},
			{
				name: 'Facebook AdSet',
				value: 'facebook_adset',
			},
			{
				name: 'Facebook Campaign',
				value: 'facebook_campaign',
			},
			{
				name: 'Google Ad',
				value: 'google_ad',
			},
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
				name: 'Google V2 Keyword',
				value: 'google_v2_keyword',
				description: 'Only available for Google v2 integration',
			},
			{
				name: 'LinkedIn Campaign',
				value: 'linkedin_campaign',
			},
			{
				name: 'Pinterest Ad',
				value: 'pinterest_ad',
			},
			{
				name: 'Pinterest AdGroup',
				value: 'pinterest_adgroup',
			},
			{
				name: 'Snapchat Ad',
				value: 'snapchat_ad',
			},
			{
				name: 'Snapchat AdSquad',
				value: 'snapchat_adsquad',
			},
			{
				name: 'TikTok Ad',
				value: 'tiktok_ad',
			},
			{
				name: 'TikTok AdGroup',
				value: 'tiktok_adgroup',
			},
			{
				name: 'Twitter AdGroup',
				value: 'twitter_adgroup',
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
			{ name: '1 Year LTV', value: '1_year_ltv' },
			{ name: '1 Year LTV Forecast', value: '1_year_ltv_forecast' },
			{ name: '30 Days LTV', value: '30_days_ltv' },
			{ name: '30 Days LTV Forecast', value: '30_days_ltv_forecast' },
			{ name: '6 Months LTV', value: '6_months_ltv' },
			{ name: '6 Months LTV Forecast', value: '6_months_ltv_forecast' },
			{ name: '60 Days LTV', value: '60_days_ltv' },
			{ name: '60 Days LTV Forecast', value: '60_days_ltv_forecast' },
			{ name: '90 Days LTV', value: '90_days_ltv' },
			{ name: '90 Days LTV Forecast', value: '90_days_ltv_forecast' },
			{ name: 'AOV', value: 'aov' },
			{ name: 'ATC CVR', value: 'atc_cvr' },
			{ name: 'ATC Events', value: 'atc_events' },
			{ name: 'ATC Rate', value: 'atc_rate' },
			{ name: 'CAC', value: 'cac' },
			{ name: 'Calls', value: 'calls' },
			{ name: 'Canceled Calls', value: 'canceled_calls' },
			{ name: 'Canceled Subscriptions', value: 'canceled_subscriptions' },
			{ name: 'Canceled Trials', value: 'canceled_trials' },
			{ name: 'Carts', value: 'carts' },
			{ name: 'Churn Rate', value: 'churn_rate' },
			{ name: 'Clicks', value: 'clicks' },
			{ name: 'Converted Trials', value: 'converted_trials' },
			{ name: 'Cost', value: 'cost' },
			{ name: 'Cost of Goods', value: 'cost_of_goods' },
			{ name: 'Cost Per ATC', value: 'cost_per_atc' },
			{ name: 'Cost Per Call', value: 'cost_per_call' },
			{ name: 'Cost Per Click', value: 'cost_per_click' },
			{ name: 'Cost Per Lead', value: 'cost_per_lead' },
			{ name: 'Cost Per New Lead', value: 'cost_per_new_lead' },
			{ name: 'Cost Per New Subscriptions', value: 'cost_per_new_subscriptions' },
			{ name: 'Cost Per New Trials', value: 'cost_per_new_trials' },
			{ name: 'Cost Per New Visit', value: 'cost_per_new_visit' },
			{ name: 'Cost Per Qualified Call', value: 'cost_per_qualified_call' },
			{ name: 'Cost Per Sale', value: 'cost_per_sale' },
			{ name: 'Cost Per Unique Call', value: 'cost_per_unique_call' },
			{ name: 'Cost Per Unique Customer', value: 'cost_per_unique_customer' },
			{ name: 'Cost Per Unique Sale', value: 'cost_per_unique_sale' },
			{ name: 'CPM', value: 'cpm' },
			{ name: 'CTR', value: 'ctr' },
			{ name: 'Customers', value: 'customers' },
			{ name: 'CVR', value: 'cvr' },
			{ name: 'Direct Subscriptions', value: 'direct_subscriptions' },
			{ name: 'Gross Margins', value: 'gross_margins' },
			{ name: 'Hard Costs', value: 'hard_costs' },
			{ name: 'Impressions', value: 'impressions' },
			{ name: 'Leads', value: 'leads' },
			{ name: 'Name', value: 'name' },
			{ name: 'Net Profit', value: 'net_profit' },
			{ name: 'Net Profit Percentage', value: 'net_profit_percentage' },
			{ name: 'New Customers Percentage', value: 'new_customers_percentage' },
			{ name: 'New Leads', value: 'new_leads' },
			{ name: 'New MRR', value: 'new_mrr' },
			{ name: 'New Subscriptions', value: 'new_subscriptions' },
			{ name: 'New Trials', value: 'new_trials' },
			{ name: 'New Visits', value: 'new_visits' },
			{ name: 'One Time Sales', value: 'one_time_sales' },
			{ name: 'Parent Name', value: 'parent_name' },
			{ name: 'Partial Video Views', value: 'partial_video_views' },
			{ name: 'Profit', value: 'profit' },
			{ name: 'Purchased Carts', value: 'purchased_carts' },
			{ name: 'Qualified Calls', value: 'qualified_calls' },
			{ name: 'Recurring Customers', value: 'recurring_customers' },
			{ name: 'Recurring Revenue', value: 'recurring_revenue' },
			{ name: 'Refund', value: 'refund' },
			{ name: 'Refund Count', value: 'refund_count' },
			{ name: 'Refund Revenue Percentage', value: 'refund_revenue_percentage' },
			{ name: 'Refund Sales Percentage', value: 'refund_sales_percentage' },
			{ name: 'Reported', value: 'reported' },
			{ name: 'Reported Result', value: 'reported_result' },
			{ name: 'Reported vs Revenue', value: 'reported_vs_revenue' },
			{ name: 'Revenue', value: 'revenue' },
			{ name: 'ROAS', value: 'roas' },
			{ name: 'ROI', value: 'roi' },
			{ name: 'Sales', value: 'sales' },
			{ name: 'Shipping Value', value: 'shipping_value' },
			{ name: 'Shop Reported Result', value: 'shop_reported_result' },
			{ name: 'Subscription 1 Year Forecast', value: 'subscription_1_year_forecast' },
			{ name: 'Subscription 30 Days Forecast', value: 'subscription_30_days_forecast' },
			{ name: 'Subscription 6 Months Forecast', value: 'subscription_6_months_forecast' },
			{ name: 'Subscription 60 Days Forecast', value: 'subscription_60_days_forecast' },
			{ name: 'Subscription 90 Days Forecast', value: 'subscription_90_days_forecast' },
			{ name: 'Taxes', value: 'taxes' },
			{ name: 'Time of Call Attribution', value: 'time_of_call_attribution' },
			{ name: 'Time of Sale Attribution', value: 'time_of_sale_attribution' },
			{ name: 'Total Customers', value: 'total_customers' },
			{ name: 'Total Revenue', value: 'total_revenue' },
			{ name: 'Unique Calls', value: 'unique_calls' },
			{ name: 'Unique Customers', value: 'unique_customers' },
			{ name: 'Unique Customers Revenue', value: 'unique_customers_revenue' },
			{ name: 'Unique Sales', value: 'unique_sales' },
			{ name: 'Unqualified Calls', value: 'unqualified_calls' },
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
		description: 'Based on level, IDs of which you want to retrieve information, separated by comma. For example, if your level is facebook_ad, then place the ad ID here. For getAdAccountReport, only 1 ID is permitted.',
	},
	{
		displayName: 'Basis',
		name: 'basis',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['attribution'],
				operation: ['getRoas'],
			},
		},
		options: [
			{
				name: 'Click Date',
				value: 'click_date',
				description: 'Credits the clicks made inside the range, however long their sales took to land afterwards',
			},
			{
				name: 'Sale Date',
				value: 'sale_date',
				description: 'Counts only the revenue collected inside the range',
			},
		],
		default: 'click_date',
		description: 'Which date the range filters on',
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
				operation: ['getMarginalCacCurve'],
			},
		},
		options: [
			{
				displayName: 'Attribution Model',
				name: 'attributionModel',
				type: 'options',
				options: [
					{
						name: 'First Click',
						value: 'first_click',
						description: 'The customer belongs to the first ad that touched them: a cost-of-acquisition curve, the way to read prospecting entities',
					},
					{
						name: 'Last Click',
						value: 'last_click',
						description: 'The customer belongs to the click that immediately preceded the purchase: a cost-of-closing curve, the way to read retargeting and bottom-of-funnel entities',
					},
				],
				default: 'first_click',
				description: 'Which model credits a customer to the entity',
			},
			{
				displayName: 'CAC Ceiling',
				name: 'cacCeiling',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
				},
				description: 'Maximum acceptable cost to acquire one customer. Overrides the LTV break-even ceiling. Required at the Account level, which carries no LTV.',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'ISO 8601 ending date of the history. Defaults to today.',
			},
			{
				displayName: 'LTV Window',
				name: 'ltvWindow',
				type: 'options',
				options: [
					{ name: '1 Year', value: '1_year' },
					{ name: '30 Days', value: '30_days' },
					{ name: '6 Months', value: '6_months' },
					{ name: '60 Days', value: '60_days' },
					{ name: '90 Days', value: '90_days' },
				],
				default: '90_days',
				description: 'Realized LTV window used as the break-even ceiling when CAC Ceiling is absent. Rejected at the Account level; provide CAC Ceiling there instead.',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'ISO 8601 starting date of the history. Defaults to 90 days before End Date.',
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
				resource: ['attribution'],
				operation: ['getAdsReport', 'getAdAccountReport'],
			},
		},
		options: [
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
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Week',
						value: 'week',
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
			{
				displayName: 'Day of Attribution',
				name: 'dayOfAttribution',
				type: 'boolean',
				default: false,
				description: 'Whether the date range will be used to filter sales within the range (false) or if it will be used to filter the clicks that ended up triggering them',
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
				description: 'Whether the ID placed in IDs should be the ad account ID. All sources of the ad account will be included in the response, depending on the selected level.',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
			},
			{
				displayName: 'Keywords IDs',
				name: 'keywordsIds',
				type: 'string',
				default: '',
				description: 'Map of ad group IDs (in the case of Google ads) and keywords for which you want to retrieve information. Example: 66457534290:[391764277422,10000010],76590307372:[10000010].',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
			},
			{
				displayName: 'Lead Stage',
				name: 'leadStage',
				type: 'string',
				default: '',
				description: 'Filters the report to sources with leads in any of the given account lead stages, by stage name (case-insensitive), comma-separated (e.g. mql,sql,customer). An unknown stage name returns a 400.',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
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
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to retrieve (from nextPageId in response). Only supported by the ads report.',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 50,
				description: 'Maximum number of results per page (1-250). Only supported by the ads report.',
				typeOptions: {
					minValue: 1,
					maxValue: 250,
				},
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
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
				],
				default: 'active',
				description: 'Filters ad spend by status. Only supported when Time Grouping Option is Source Link.',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
			},
			{
				displayName: 'Time Grouping Option',
				name: 'timeGroupingOption',
				type: 'options',
				options: [
					{
						name: 'Day',
						value: 'day',
					},
					{
						name: 'Month',
						value: 'month',
					},
					{
						name: 'Source Link',
						value: 'source_link',
					},
					{
						name: 'Week',
						value: 'week',
					},
					{
						name: 'Year',
						value: 'year',
					},
				],
				default: 'source_link',
				description: 'Defines how the response will be grouped. Not supported when Is Ad Account ID is enabled.',
				displayOptions: {
					show: {
						'/operation': ['getAdsReport'],
					},
				},
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
		],
	},
];
