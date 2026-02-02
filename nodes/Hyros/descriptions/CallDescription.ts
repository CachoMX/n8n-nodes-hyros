import { INodeProperties } from 'n8n-workflow';

export const callOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['call'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new call record',
				action: 'Create a call',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get calls with optional filtering',
				action: 'Get calls',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update call(s)',
				action: 'Update calls',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a call',
				action: 'Delete a call',
			},
		],
		default: 'create',
	},
];

export const callFields: INodeProperties[] = [
	// Create Call (POST /calls)
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the call (required)',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email address of the caller (required)',
	},
	{
		displayName: 'Call ID',
		name: 'callId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'Unique identifier for the call to delete',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of the lead that made the call',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the lead that made the call',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated phone numbers of the lead (array)',
			},
			{
				displayName: 'Lead IPs',
				name: 'leadIps',
				type: 'string',
				default: '',
				description: 'Comma-separated IPs of the customer (used for ad attribution)',
			},
			{
				displayName: 'Stage',
				name: 'stage',
				type: 'string',
				default: '',
				description: 'The name of a stage to be applied to the customer\'s lead',
			},
			{
				displayName: 'External ID',
				name: 'externalId',
				type: 'string',
				default: '',
				description: 'Unique identifier from external integration. If exists, call will be updated',
			},
			{
				displayName: 'ID (Deprecated)',
				name: 'id',
				type: 'string',
				default: '',
				description: 'Deprecated! Use externalId instead. Identifier by which the call will be grouped',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date on which the transaction was processed (ISO 8601 format)',
			},
			{
				displayName: 'Qualification',
				name: 'qualification',
				type: 'string',
				default: '',
				description: 'The custom name of the qualification to be applied to the call',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{ name: 'Qualified', value: 'QUALIFIED' },
					{ name: 'Unqualified', value: 'UNQUALIFIED' },
					{ name: 'Cancelled', value: 'CANCELLED' },
					{ name: 'No Show', value: 'NO_SHOW' },
				],
				default: 'QUALIFIED',
				description: 'Indicates the call state to be assigned',
			},
			{
				displayName: 'Qualified (Deprecated)',
				name: 'qualified',
				type: 'boolean',
				default: true,
				description: 'Deprecated! Use state param instead. Flag that indicates if call should be marked as unqualified',
			},
		],
	},
	// Get Calls (GET /calls with query params)
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated call IDs (max 50)',
			},
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				default: '',
				description: 'Comma-separated emails (max 50)',
			},
			{
				displayName: 'Lead IDs',
				name: 'leadIds',
				type: 'string',
				default: '',
				description: 'Comma-separated lead IDs (max 50)',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated phone numbers',
			},
			{
				displayName: 'Product Tags',
				name: 'productTags',
				type: 'string',
				default: '',
				description: 'Comma-separated product tags (max 20)',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only calls after this date (ISO 8601 format)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only calls before this date (ISO 8601 format)',
			},
			{
				displayName: 'Page Size',
				name: 'pageSize',
				type: 'number',
				default: 50,
				description: 'Maximum number of calls per page (1-250)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'Page ID for pagination (from nextPageId in response)',
			},
			{
				displayName: 'Qualified',
				name: 'qualified',
				type: 'boolean',
				default: true,
				description: 'Filter for qualified/unqualified calls',
			},
			{
				displayName: 'Qualification Stages',
				name: 'qualificationStages',
				type: 'string',
				default: '',
				description: 'Comma-separated qualification stage names (max 50)',
			},
		],
	},
	// Update Calls (PUT /calls with query params)
	{
		displayName: 'IDs',
		name: 'ids',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Comma-separated call IDs to update (max 50)',
	},
	{
		displayName: 'External IDs',
		name: 'externalIds',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Comma-separated call external IDs to update (max 50)',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Call name to be assigned (required)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Qualification',
				name: 'qualification',
				type: 'string',
				default: '',
				description: 'Call qualification to be assigned',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{ name: 'Qualified', value: 'QUALIFIED' },
					{ name: 'Unqualified', value: 'UNQUALIFIED' },
					{ name: 'Cancelled', value: 'CANCELLED' },
					{ name: 'No Show', value: 'NO_SHOW' },
				],
				default: 'QUALIFIED',
				description: 'Call state to be assigned',
			},
			{
				displayName: 'Qualified (Deprecated)',
				name: 'qualified',
				type: 'boolean',
				default: true,
				description: 'Deprecated! Use state param instead. Whether call is qualified',
			},
		],
	},
];
