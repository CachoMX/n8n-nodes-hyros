import { INodeProperties } from 'n8n-workflow';

export const customConversionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customConversion'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Record a custom conversion for a lead',
				action: 'Create a custom conversion',
			},
		],
		default: 'create',
	},
];

export const customConversionFields: INodeProperties[] = [
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customConversion'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: '$demo-booked',
		description: 'Tag identifying the conversion. Must start with the $ symbol and be at least 3 characters. If no conversion definition exists for this tag, one is created automatically from the custom fields sent.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customConversion'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email of the lead the conversion is attributed to. Required if no phone number is provided.',
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
				displayName: 'Lead IPs',
				name: 'leadIps',
				type: 'string',
				default: '',
				description: 'Comma-separated IPs of the lead for ad attribution. At most the first 3 are used.',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated phone numbers of the lead in E.164 format. Required if no email is provided.',
			},
		],
	},
	{
		displayName: 'Custom Fields',
		name: 'customFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Custom Field',
		displayOptions: {
			show: {
				resource: ['customConversion'],
				operation: ['create'],
			},
		},
		description: 'Custom fields of the conversion, sent as top-level properties (e.g. demoDate, salesRep, amount). If the conversion definition already exists, its required fields must be present and only its declared fields are stored.',
		options: [
			{
				name: 'field',
				displayName: 'Field',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
						description: 'Name of the custom field (e.g. demoDate, salesRep, amount)',
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'Boolean', value: 'boolean' },
							{ name: 'Date', value: 'date' },
							{ name: 'Number', value: 'number' },
							{ name: 'String', value: 'string' },
						],
						default: 'string',
						description: 'How to send the value. Number and Boolean are sent as JSON numbers/booleans so the API infers the right field type.',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value of the custom field. For dates use ISO 8601 format.',
					},
				],
			},
		],
	},
];
