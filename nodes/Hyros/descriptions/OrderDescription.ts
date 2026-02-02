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
		displayOptions: {
			show: {
				resource: ['order'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Email associated with the lead that made the purchase. If no email is entered, a phone number is required.',
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
						description: 'Product price (per unit with costOfGoods included)',
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
						displayName: 'Cost of Goods',
						name: 'costOfGoods',
						type: 'number',
						default: 0,
						description: 'Cost per unit of manufacture of the product. It must be included in the price. Defaults to 0 if not included',
					},
					{
						displayName: 'Taxes',
						name: 'taxes',
						type: 'number',
						default: 0,
						description: 'The taxes applied to the item (per unit). Defaults to 0 if not included',
					},
					{
						displayName: 'Item Discount',
						name: 'itemDiscount',
						type: 'number',
						default: 0,
						description: 'The discount value that will be applied to the specific line item',
					},
					{
						displayName: 'Packages',
						name: 'packages',
						type: 'string',
						default: '',
						description: 'Comma-separated list of product packages to which this item belongs (used for recurring sales attribution)',
					},
					{
						displayName: 'Tag',
						name: 'tag',
						type: 'string',
						default: '',
						description: 'The tag that will be created for the sale item',
					},
					{
						displayName: 'Category Name',
						name: 'categoryName',
						type: 'string',
						default: '',
						description: 'The sale will be linked to a product category',
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
				displayName: 'Parent Email',
				name: 'parentEmail',
				type: 'string',
				default: '',
				description: 'Email of the origin lead of the lead that made the purchase. If present, the lead with the email provided would be assigned as origin lead of the lead that made the purchase and the sale would be attributed to the origin lead.',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of the lead that made the purchase',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the lead that made the purchase',
			},
			{
				displayName: 'Lead IPs',
				name: 'leadIps',
				type: 'string',
				default: '',
				description: 'Comma-separated list of IP addresses of the customer that made the purchase. Will be used on the Ad attributing process.',
			},
			{
				displayName: 'Phone Numbers',
				name: 'phoneNumbers',
				type: 'string',
				default: '',
				description: 'Comma-separated list of phone numbers of the lead that made the purchase. Will be used on the Ad attributing process. If no email is entered, a phone number is required.',
			},
			{
				displayName: 'Stage',
				name: 'stage',
				type: 'string',
				default: '',
				description: 'The name of a stage to be applied to the customer\'s lead',
			},
			{
				displayName: 'Order ID',
				name: 'orderId',
				type: 'string',
				default: '',
				description: 'Identifier by which sales will be grouped. A default id will be assigned if it is not included. Only letters, numbers, underscores (_), hyphens (-), periods (.), and colons (:) are accepted, with no spaces allowed.',
			},
			{
				displayName: 'External Subscription ID',
				name: 'externalSubscriptionId',
				type: 'string',
				default: '',
				description: 'Indicates which subscription it belongs to',
			},
			{
				displayName: 'Cart ID',
				name: 'cartId',
				type: 'string',
				default: '',
				description: 'Cart identifier to which the order will be linked',
			},
			{
				displayName: 'Date',
				name: 'date',
				type: 'dateTime',
				default: '',
				description: 'Date on which the transaction was processed (ISO 8601 format). Default is current date and time.',
			},
			{
				displayName: 'Shipping Cost',
				name: 'shippingCost',
				type: 'number',
				default: 0,
				description: 'The sales shipping cost. This value will be distributed to items. Default is zero.',
			},
			{
				displayName: 'Taxes',
				name: 'taxes',
				type: 'number',
				default: 0,
				description: 'The order taxes. This value will be distributed to items. Default is zero.',
			},
			{
				displayName: 'Order Discount',
				name: 'orderDiscount',
				type: 'number',
				default: 0,
				description: 'The discount value that will be applied to the complete order, distributing its value evenly across all line items',
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
				description: 'The sales price format',
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
				description: 'Indicates the amount to be refunded (optional)',
			},
		],
	},
];
