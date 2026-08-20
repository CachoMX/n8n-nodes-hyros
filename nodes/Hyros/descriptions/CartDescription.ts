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
				name: 'Get Many',
				value: 'getAll',
				description: 'Get carts, filterable to abandoned ones',
				action: 'Get many carts',
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
						displayName: 'External ID',
						name: 'externalId',
						type: 'string',
						default: '',
						description: 'Unique identifier of the product coming from the external integration',
					},
					{
						displayName: 'Is Rebill',
						name: 'isRebill',
						type: 'boolean',
						default: false,
						description: 'Whether the sale is marked as recurring even if it is the first one',
					},
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						description: 'Name of the product (min 3 characters)',
							required:	true,
					},
					{
						displayName: 'Price',
						name: 'price',
						type: 'number',
						default: 0,
						description: 'Product price',
							required:	true,
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
						description: 'The number of copies purchased for the received product. Defaults to 1 if not included.',
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
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				description: 'Currency code (e.g., EUR, USD). Default is Hyros account setup.',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date on which the transaction was processed (ISO 8601 format). Default is current date and time.',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
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
		],
	},
	// ------ Get Many ------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['cart'],
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
				resource: ['cart'],
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
				resource: ['cart'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				default: '',
				description: 'Comma-separated emails (max 50)',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Only carts created on or after this date',
			},
			{
				displayName: 'Lead IDs',
				name: 'leadIds',
				type: 'string',
				default: '',
				description: 'Comma-separated lead IDs (max 50)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
			{
				displayName: 'Purchased',
				name: 'purchased',
				type: 'boolean',
				default: false,
				description: 'Whether to return only carts that became an order. Set false to find abandoned carts.',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Only carts created on or before this date',
			},
		],
	},
];
