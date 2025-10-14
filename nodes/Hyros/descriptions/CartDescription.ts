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
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cart'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Customer email address',
	},
	{
		displayName: 'Cart ID',
		name: 'cartId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cart'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Unique cart identifier',
	},
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
						displayName: 'Product ID',
						name: 'productId',
						type: 'string',
						default: '',
						description: 'Product identifier',
						required: true,
					},
					{
						displayName: 'Product Name',
						name: 'productName',
						type: 'string',
						default: '',
						description: 'Product name',
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
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
						description: 'Quantity in cart',
					},
					{
						displayName: 'Variant',
						name: 'variant',
						type: 'string',
						default: '',
						description: 'Product variant',
					},
					{
						displayName: 'Category',
						name: 'category',
						type: 'string',
						default: '',
						description: 'Product category',
					},
					{
						displayName: 'SKU',
						name: 'sku',
						type: 'string',
						default: '',
						description: 'Stock keeping unit',
					},
					{
						displayName: 'Image URL',
						name: 'imageUrl',
						type: 'string',
						default: '',
						description: 'Product image URL',
					},
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'Product page URL',
					},
				],
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
				resource: ['cart'],
				operation: ['create', 'update'],
			},
		},
		options: [
			{
				displayName: 'Total',
				name: 'total',
				type: 'number',
				default: 0,
				description: 'Total cart value',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Coupon Code',
				name: 'couponCode',
				type: 'string',
				default: '',
				description: 'Coupon code applied',
			},
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'number',
				default: 0,
				description: 'Discount amount',
			},
			{
				displayName: 'Cart URL',
				name: 'cartUrl',
				type: 'string',
				default: '',
				description: 'URL to the cart',
			},
			{
				displayName: 'Recovery URL',
				name: 'recoveryUrl',
				type: 'string',
				default: '',
				description: 'Cart recovery URL',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Traffic source',
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
				description: 'Cart creation/update timestamp (ISO 8601 format)',
			},
		],
	},
];
