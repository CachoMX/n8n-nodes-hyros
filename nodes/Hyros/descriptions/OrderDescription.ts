import { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['order'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new order',
				action: 'Create an order',
			},
			{
				name: 'Refund',
				value: 'refund',
				description: 'Refund an order',
				action: 'Refund an order',
			},
		],
		default: 'create',
	},
];

export const orderFields: INodeProperties[] = [
	// Create Order
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Customer email address',
	},
	{
		displayName: 'Order Number',
		name: 'orderNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Unique order number',
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
				resource: ['order'],
				operation: ['create'],
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
						description: 'Quantity purchased',
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
				resource: ['order'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Total',
				name: 'total',
				type: 'number',
				default: 0,
				description: 'Total order amount',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Shipping',
				name: 'shipping',
				type: 'number',
				default: 0,
				description: 'Shipping cost',
			},
			{
				displayName: 'Tax',
				name: 'tax',
				type: 'number',
				default: 0,
				description: 'Tax amount',
			},
			{
				displayName: 'Discount',
				name: 'discount',
				type: 'number',
				default: 0,
				description: 'Discount amount',
			},
			{
				displayName: 'Coupon Code',
				name: 'couponCode',
				type: 'string',
				default: '',
				description: 'Coupon code used',
			},
			{
				displayName: 'Payment Method',
				name: 'paymentMethod',
				type: 'string',
				default: '',
				description: 'Payment method used',
			},
			{
				displayName: 'Shipping Method',
				name: 'shippingMethod',
				type: 'string',
				default: '',
				description: 'Shipping method used',
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
				displayName: 'Sub Source',
				name: 'subSource',
				type: 'string',
				default: '',
				description: 'Sub source for granular tracking',
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
				displayName: 'FB Click ID',
				name: 'fbclid',
				type: 'string',
				default: '',
				description: 'Facebook click ID',
			},
			{
				displayName: 'Google Click ID',
				name: 'gclid',
				type: 'string',
				default: '',
				description: 'Google click ID',
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
				description: 'Order timestamp (ISO 8601 format)',
			},
		],
	},
	// Refund Order (DELETE /orders/{id})
	{
		displayName: 'Order ID',
		name: 'orderId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['refund'],
			},
		},
		default: '',
		description: 'Order ID to refund',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['refund'],
			},
		},
		options: [
			{
				displayName: 'Refunded Amount',
				name: 'refundedAmount',
				type: 'number',
				default: 0,
				description: 'Optional refunded amount',
			},
		],
	},
];
