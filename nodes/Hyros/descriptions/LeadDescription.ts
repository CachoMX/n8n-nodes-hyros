import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get multiple leads with optional filtering',
				action: 'Get many leads',
			},
			{
				name: 'Get Journey',
				value: 'getJourney',
				description: 'Get the complete customer journey for a lead',
				action: 'Get lead journey',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing lead',
				action: 'Update a lead',
			},
		],
		default: 'create',
	},
];

export const leadFields: INodeProperties[] = [
	// Create Lead
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email address of the lead. If no email is entered, a phone number is required.',
	},
	// Update Lead - search parameter
	{
		displayName: 'Search By',
		name: 'searchBy',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['update'],
			},
		},
		options: [
			{
				name: 'Email',
				value: 'email',
			},
			{
				name: 'ID',
				value: 'id',
			},
			{
				name: 'Phone',
				value: 'phone',
			},
		],
		default: 'email',
		description: 'Parameter used to search for the lead to update',
	},
	{
		displayName: 'Search Value',
		name: 'searchValue',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The email, ID, or phone value to search for the lead',
	},
	// Get Journey - IDs parameter
	{
		displayName: 'Lead IDs',
		name: 'ids',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['getJourney'],
			},
		},
		default: '',
		description: 'Comma-separated list of lead IDs to retrieve journey information',
	},
	// Get Many Leads
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['lead'],
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
				resource: ['lead'],
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
				resource: ['lead'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				default: '',
				description: 'Comma-separated list of emails to search (max 50)',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of lead IDs (max 50)',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only leads whose join date is more recent than this (ISO 8601 format)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only leads whose join date is before this (ISO 8601 format)',
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
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email address of the lead (for update operation, this sets a new email)',
				displayOptions: {
					show: {
						'/operation': ['update'],
					},
				},
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of the lead',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the lead',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags to apply to the lead',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated list of phone numbers. If no email is entered, at least one phone number is required.',
			},
			{
				displayName: 'Lead IPs',
				name: 'leadIps',
				type: 'string',
				default: '',
				description: 'Comma-separated list of IP addresses that will be used on the Ad attributing process',
			},
			{
				displayName: 'Stage',
				name: 'stage',
				type: 'string',
				default: '',
				description: 'The name of a stage to be applied to the lead',
			},
			{
				displayName: 'Ad Optimization Consent',
				name: 'adOptimizationConsent',
				type: 'options',
				options: [
					{
						name: 'Granted',
						value: 'GRANTED',
					},
					{
						name: 'Denied',
						value: 'DENIED',
					},
					{
						name: 'Unspecified',
						value: 'UNSPECIFIED',
					},
				],
				default: 'UNSPECIFIED',
				description: 'Ad optimization consent status',
			},
			{
				displayName: 'Lead Stage',
				name: 'leadStage',
				type: 'fixedCollection',
				default: {},
				description: 'Lead stage to apply to the lead (for update operation)',
				displayOptions: {
					show: {
						'/operation': ['update'],
					},
				},
				options: [
					{
						displayName: 'Stage Details',
						name: 'stageDetails',
						values: [
							{
								displayName: 'Name',
								name: 'name',
								type: 'string',
								default: '',
								description: 'Stage name',
							},
							{
								displayName: 'Date',
								name: 'date',
								type: 'dateTime',
								default: '',
								description: 'Stage date (ISO 8601 format)',
							},
						],
					},
				],
			},
		],
	},
];
