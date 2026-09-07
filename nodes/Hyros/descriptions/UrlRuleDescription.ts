import { INodeProperties } from 'n8n-workflow';

export const urlRuleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['urlRule'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a URL rule that tags matching traffic',
				action: 'Create a URL rule',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a URL rule so it no longer tags matching traffic',
				action: 'Delete a URL rule',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single URL rule by its ID',
				action: 'Get a URL rule',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many URL rules. Only simple rules are returned; built-in default rules are excluded.',
				action: 'Get many URL rules',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a URL rule. This is a full replacement: every required field must be provided, and any omitted optional field is cleared.',
				action: 'Update a URL rule',
			},
		],
		default: 'getAll',
	},
];

export const urlRuleFields: INodeProperties[] = [
	// ------ Get / Update / Delete: rule ID ------
	{
		displayName: 'URL Rule ID',
		name: 'urlRuleId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlRule'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'Opaque ID of the URL rule (e.g. ur-a3f5c9d2), as returned by Get Many or Create',
	},
	// ------ Create / Update: required body fields ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlRule'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'A descriptive label for the rule. At most 255 characters.',
	},
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlRule'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The tag applied when the rule matches. Its prefix sets the rule flavor: ! (action tag), @ (source tag), $ (sale tag) or # (subscription tag). The one exception is a lead-stage rule (Create Lead Stage enabled): send a tag without a prefix, it becomes the lead stage name.',
	},
	{
		displayName: 'Words to Match',
		name: 'wordsToMatch',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlRule'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Comma-separated list of words or substrings. The rule matches when the URL contains any one of them, ignoring case. At least one non-empty value is required, and a value cannot contain a comma.',
	},
	{
		displayName: 'Source Rule Types',
		name: 'sourceRuleTypes',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['urlRule'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				name: 'Previous URL',
				value: 'PREVIOUS_URL',
			},
			{
				name: 'Referrer URL',
				value: 'REFERRER_URL',
			},
		],
		default: [],
		description: 'Which URL(s) the rule inspects. At least one is required.',
	},
	// ------ Create / Update: optional body fields ------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['urlRule'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Apply Base Domain',
				name: 'applyBaseDomain',
				type: 'boolean',
				default: false,
				description: 'Whether to match against the base domain only instead of the complete URL',
			},
			{
				displayName: 'Create Lead Stage',
				name: 'createLeadStage',
				type: 'boolean',
				default: false,
				description: 'Whether this is a lead-stage rule. When enabled, send a prefix-less Tag: it becomes the lead stage name, the backend creates the stage, and the rule flavor is stamped as LEAD_STAGE. On Update, a lead-stage rule must keep this enabled, otherwise its prefix-less tag is rejected.',
			},
			{
				displayName: 'Disregard Source',
				name: 'disregardSource',
				type: 'boolean',
				default: false,
				description: 'Whether matched traffic is marked as low priority so it does not override an existing source',
			},
			{
				displayName: 'Is Enabled',
				name: 'isEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether the rule is active. Defaults to true. As Update is a full replace, omitting it there re-enables the rule: send the current value to preserve it.',
			},
			{
				displayName: 'Scores',
				name: 'scores',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				placeholder: 'Add Score',
				description: 'Keyword groups that score the sale attributed to a matched click. With the default score of 0 they mark it as unqualified. If several entries match, the highest score wins.',
				options: [
					{
						name: 'score',
						displayName: 'Score',
						values: [
							{
								displayName: 'Keywords',
								name: 'keywords',
								type: 'string',
								default: '',
								description: 'Comma-separated keywords. All of them must be present in the matched URL for the entry to apply, ignoring case. At least one non-empty keyword is required.',
							},
							{
								displayName: 'Score',
								name: 'score',
								type: 'number',
								default: 0,
								description: 'Score assigned to the sale attributed to the matched click. Defaults to 0 (unqualified).',
							},
						],
					},
				],
			},
			{
				displayName: 'Source Category',
				name: 'sourceCategory',
				type: 'string',
				default: '',
				description: 'Assign a fixed source category by name. The category is created if it does not exist. Mutually exclusive with Source Category Parameter.',
			},
			{
				displayName: 'Source Category Parameter',
				name: 'sourceCategoryToMatch',
				type: 'string',
				default: '',
				description: 'URL parameter to read the source category from dynamically. A single value of at most 255 characters, without commas. Mutually exclusive with Source Category.',
			},
			{
				displayName: 'Traffic Source Category',
				name: 'trafficSourceCategory',
				type: 'string',
				default: '',
				description: 'Assign a fixed traffic source category by name. The category is created if it does not exist. Mutually exclusive with Traffic Source Parameter.',
			},
			{
				displayName: 'Traffic Source Parameter',
				name: 'trafficSourceToMatch',
				type: 'string',
				default: '',
				description: 'URL parameter to read the traffic source from dynamically, e.g. utm_source. A single value of at most 255 characters, without commas. Mutually exclusive with Traffic Source Category.',
			},
			{
				displayName: 'Words Not to Match',
				name: 'wordsNotToMatch',
				type: 'string',
				default: '',
				description: 'Comma-separated list of words or substrings. If the URL contains any of them, the rule does not match. Matching ignores case, and a value cannot contain a comma.',
			},
		],
	},
	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['urlRule'],
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
				resource: ['urlRule'],
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
				resource: ['urlRule'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only rules created on or after this date (ISO 8601 format)',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of opaque URL rule IDs (e.g. ur-a3f5c9d2) to filter by (max 50)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved, returned as nextPageId in each response',
			},
			{
				displayName: 'Rule Type',
				name: 'urlRuleActionType',
				type: 'options',
				options: [
					{
						name: 'Action',
						value: 'ACTION',
					},
					{
						name: 'Lead Stage',
						value: 'LEAD_STAGE',
					},
					{
						name: 'Sale',
						value: 'SALE',
					},
					{
						name: 'Source Link',
						value: 'SOURCE_LINK',
					},
					{
						name: 'Subscription',
						value: 'SUBSCRIPTION',
					},
				],
				default: 'ACTION',
				description: 'Return only rules of this flavor',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Return only the rule carrying this exact tag, including its prefix',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only rules created on or before this date (ISO 8601 format)',
			},
		],
	},
];
