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
				description: 'Get a call by ID',
				action: 'Get a call',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a call',
				action: 'Update a call',
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
	// Create Call
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
				operation: ['create', 'get', 'update', 'delete'],
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Answered',
						value: 'answered',
					},
					{
						name: 'Missed',
						value: 'missed',
					},
					{
						name: 'Voicemail',
						value: 'voicemail',
					},
					{
						name: 'Busy',
						value: 'busy',
					},
					{
						name: 'Failed',
						value: 'failed',
					},
				],
				default: 'answered',
				description: 'Call status',
			},
			{
				displayName: 'Direction',
				name: 'direction',
				type: 'options',
				options: [
					{
						name: 'Inbound',
						value: 'inbound',
					},
					{
						name: 'Outbound',
						value: 'outbound',
					},
				],
				default: 'inbound',
				description: 'Call direction',
			},
			{
				displayName: 'Recording URL',
				name: 'recordingUrl',
				type: 'string',
				default: '',
				description: 'URL to the call recording',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Call notes',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Traffic source',
			},
			{
				displayName: 'Campaign',
				name: 'campaign',
				type: 'string',
				default: '',
				description: 'Campaign name',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				default: 0,
				description: 'Monetary value of the call',
			},
			{
				displayName: 'HY ID',
				name: 'hyId',
				type: 'string',
				default: '',
				description: 'Hyros tracking ID',
			},
			{
				displayName: 'Click ID',
				name: 'clickId',
				type: 'string',
				default: '',
				description: 'Click ID for attribution',
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
				description: 'Call timestamp (ISO 8601 format)',
			},
		],
	},
	// Update Call
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
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Answered',
						value: 'answered',
					},
					{
						name: 'Missed',
						value: 'missed',
					},
					{
						name: 'Voicemail',
						value: 'voicemail',
					},
					{
						name: 'Busy',
						value: 'busy',
					},
					{
						name: 'Failed',
						value: 'failed',
					},
				],
				default: 'answered',
				description: 'Call status',
			},
			{
				displayName: 'Recording URL',
				name: 'recordingUrl',
				type: 'string',
				default: '',
				description: 'URL to the call recording',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				default: '',
				description: 'Call notes',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'number',
				default: 0,
				description: 'Monetary value of the call',
			},
			{
				displayName: 'Custom Fields',
				name: 'customFields',
				type: 'json',
				default: '{}',
				description: 'Custom fields as JSON object',
			},
		],
	},
];
