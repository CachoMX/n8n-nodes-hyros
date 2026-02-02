import { INodeProperties } from 'n8n-workflow';

export const cartOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cart'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new cart',
				action: 'Create a cart',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing cart',
				action: 'Update a cart',
			},
		],
		default: 'create',
	},
];

export const cartFields: INodeProperties[] = [
	// Create Cart
	{
		displayName: 'Items',
		name: 'items',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['cart'],
				operation: ['create', 'update'],
			},
		},
		default: {},
		placeholder: 'Add Item',
		options: [
			{
				name: 'item',
				displayName: 'Item',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the product (min 3 characters)',
						required: true,
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: 0,
						description: 'Product price',
						required: true,
					},
					{
						displayName: 'External ID',
						name: 'externalId',
						type: 'string',
						default: '',
						description: 'Unique identifier of the product coming from the external integration',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
						description: 'The number of copies purchased for the received product. Defaults to 1 if not included',
					},
					{
						displayName: 'SKU',
						name: 'sku',
						type: 'string',
						default: '',
						description: 'The unique product reference code',
					},
				],
			},
		],
	},
	// Update Cart - Cart ID
	{
		displayName: 'Cart ID',
		name: 'cartId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cart'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID of the cart to be updated',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['cart'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Cart ID',
				name: 'cartId',
				type: 'string',
				default: '',
				description: 'The ID of the cart to be created. A default one will be created if it is not included.',
				displayOptions: {
					show: {
						'/operation': ['create'],
					},
				},
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email associated with the lead that owns the cart',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of the lead that owns the cart',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the lead that owns the cart',
			},
			{
				displayName: 'Lead IPs',
				name: 'leadIps',
				type: 'string',
				default: '',
				description: 'Comma-separated list of IP addresses of the customer that owns the cart. Will be used on the Ad attributing process.',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated list of phone numbers of the lead that owns the cart. Will be used on the Ad attributing process.',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date on which the transaction was processed (ISO 8601 format). Default is current date and time.',
			},
			{
				displayName: 'Price Format',
				name: 'priceFormat',
				type: 'options',
				options: [
					{
						name: 'Decimal',
						value: 'DECIMAL',
					},
					{
						name: 'Integer',
						value: 'INTEGER',
					},
				],
				default: 'DECIMAL',
				description: 'The cart items price format',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g., EUR, USD). Default is Hyros account setup.',
			},
		],
	},
];
