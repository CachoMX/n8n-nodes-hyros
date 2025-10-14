import { INodeProperties } from 'n8n-workflow';

export const sourceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['source'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all sources',
				action: 'Get all sources',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new source',
				action: 'Create a source',
			},
		],
		default: 'getAll',
	},
];

export const sourceFields: INodeProperties[] = [
	{
		displayName: 'Source Name',
		name: 'sourceName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the traffic source',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['source'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Source description',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{
						name: 'Paid',
						value: 'paid',
					},
					{
						name: 'Organic',
						value: 'organic',
					},
					{
						name: 'Referral',
						value: 'referral',
					},
					{
						name: 'Direct',
						value: 'direct',
					},
					{
						name: 'Social',
						value: 'social',
					},
					{
						name: 'Email',
						value: 'email',
					},
					{
						name: 'Other',
						value: 'other',
					},
				],
				default: 'paid',
				description: 'Source type',
			},
			{
				displayName: 'Active',
				name: 'active',
				type: 'boolean',
				default: true,
				description: 'Whether the source is active',
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
