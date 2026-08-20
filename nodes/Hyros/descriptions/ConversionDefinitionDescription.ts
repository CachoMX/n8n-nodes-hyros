import { INodeProperties } from 'n8n-workflow';

export const conversionDefinitionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a conversion definition',
				action: 'Create a conversion definition',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a conversion definition',
				action: 'Delete a conversion definition',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many conversion definitions',
				action: 'Get many conversion definitions',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update the captured fields of a conversion definition',
				action: 'Update a conversion definition',
			},
		],
		default: 'getAll',
	},
];

const conversionFieldsCollection: INodeProperties = {
	displayName: 'Conversion Fields',
	name: 'conversionFields',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
	},
	required: true,
	default: {},
	placeholder: 'Add Conversion Field',
	description: 'Fields captured by the conversion definition. The API requires at least 3.',
	options: [
		{
			name: 'field',
			displayName: 'Field',
			values: [
				{
					displayName: 'Internal Name',
					name: 'internalName',
					type: 'string',
					default: '',
					required: true,
					description: 'Internal name of the captured field (e.g. firstName, amount)',
				},
				{
					displayName: 'Field Type',
					name: 'fieldType',
					type: 'options',
					options: [
						{ name: 'Boolean', value: 'BOOLEAN' },
						{ name: 'Date', value: 'DATE' },
						{ name: 'Number', value: 'NUMBER' },
						{ name: 'String', value: 'STRING' },
					],
					default: 'STRING',
					description: 'Data type of the captured field',
				},
				{
					displayName: 'Required',
					name: 'required',
					type: 'boolean',
					default: false,
					description: 'Whether the field must be present on every conversion sent for this definition',
				},
			],
		},
	],
};

export const conversionDefinitionFields: INodeProperties[] = [
	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
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
				resource: ['conversionDefinition'],
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
				resource: ['conversionDefinition'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only conversion definitions created after this date (ISO 8601 format)',
			},
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated conversion definition IDs (max 50)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only conversion definitions created before this date (ISO 8601 format)',
			},
		],
	},

	// ------ Create ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Conversion definition name. At least 3 characters.',
	},
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: '$purchase',
		description: 'Tag to associate with the conversion definition. Must start with the $ symbol and be at least 3 characters.',
	},
	{
		...conversionFieldsCollection,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['create'],
			},
		},
	},

	// ------ Update ------
	{
		displayName: 'Conversion Definition ID',
		name: 'conversionDefinitionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'ID of the conversion definition to update, as returned by Get Many',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Current conversion definition name. The API does not allow changing it on update, but requires it to be sent and match validation (at least 3 characters).',
	},
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['update'],
			},
		},
		default: '',
		placeholder: '$purchase',
		description: 'Current tag of the conversion definition. The API does not allow changing it on update, but requires it to be sent (must start with $, at least 3 characters).',
	},
	{
		...conversionFieldsCollection,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['update'],
			},
		},
	},

	// ------ Delete ------
	{
		displayName: 'Conversion Definition ID',
		name: 'conversionDefinitionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['conversionDefinition'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'ID of the conversion definition to delete, as returned by Get Many',
	},
];
