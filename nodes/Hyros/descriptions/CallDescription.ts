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
		description: 'Email address of the caller',
	},
	{
		displayName: 'Call ID',
		name: 'callId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['call'],
				operation: ['create', 'delete'],
			},
		},
		default: '',
		description: 'Unique identifier for the call',
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
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Phone number of the caller',
			},
			{
				displayName: 'Duration',
				name: 'duration',
				type: 'number',
				default: 0,
				description: 'Call duration in seconds',
			},
			{
				displayName: 'Qualification',
				name: 'qualification',
				type: 'string',
				default: '',
				description: 'Call qualification',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Call state',
			},
			{
				displayName: 'Qualified',
				name: 'qualified',
				type: 'boolean',
				default: false,
				description: 'Whether call is qualified',
			},
			{
				displayName: 'Timestamp',
				name: 'timestamp',
				type: 'dateTime',
				default: '',
				description: 'Call timestamp (ISO 8601 format)',
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
				description: 'Comma-separated call IDs',
			},
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				default: '',
				description: 'Comma-separated emails',
			},
			{
				displayName: 'Lead IDs',
				name: 'leadIds',
				type: 'string',
				default: '',
				description: 'Comma-separated lead IDs',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated phone numbers',
			},
		],
	},
	// Update Calls (PUT /calls with query params)
	{
		displayName: 'Update Fields',
		name: 'updateFields',
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
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated call IDs to update',
			},
			{
				displayName: 'Qualification',
				name: 'qualification',
				type: 'string',
				default: '',
				description: 'Call qualification',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Call state',
			},
			{
				displayName: 'Qualified',
				name: 'qualified',
				type: 'boolean',
				default: false,
				description: 'Whether call is qualified',
			},
		],
	},
];
