import { INodeProperties } from 'n8n-workflow';

export const productOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['product'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new product',
				action: 'Create a product',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a product from the catalog',
				action: 'Delete a product',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many products',
				action: 'Get many products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a product price, SKU, cost of goods or category',
				action: 'Update a product',
			},
		],
		default: 'create',
	},
];

export const productFields: INodeProperties[] = [
	// ------ Create ------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the product (required)',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Cost of the product (required)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Product category',
			},
			{
				displayName: 'Packages',
				name: 'packages',
				type: 'string',
				default: '',
				description: 'Comma-separated product packages (used for recurring sales attribution)',
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
				resource: ['product'],
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
				resource: ['product'],
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
				resource: ['product'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Filter products by the name of their category',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Filter products whose name equals this value (exact match)',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
			{
				displayName: 'Recurring',
				name: 'isRecurringSale',
				type: 'options',
				options: [
					{ name: 'All', value: 'ALL' },
					{ name: 'Non Recurring', value: 'NON_RECURRING' },
					{ name: 'Recurring', value: 'RECURRING' },
				],
				default: 'ALL',
				description: 'Filter by recurring status',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'Filter products whose tag equals this value (exact match). The sale prefix $ is added automatically when omitted.',
			},
		],
	},

	// ------ Update / Delete ------
	{
		displayName: 'Product ID',
		name: 'productId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update', 'delete'],
			},
		},
		default: '',
		description: 'ID of the product, as returned by Get Many',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['product'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Call Product',
				name: 'callProduct',
				type: 'boolean',
				default: false,
				description: 'Whether the product is a call product. A product cannot be both a recurring sale and a call product.',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'New product category',
			},
			{
				displayName: 'Cost of Goods',
				name: 'costOfGoods',
				type: 'number',
				default: 0,
				description: 'Cost of goods of the product, used in profit and ROAS reporting (sent to the API as customCost)',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'New product name. Must have at least 3 characters.',
			},
			{
				displayName: 'Packages',
				name: 'packages',
				type: 'string',
				default: '',
				description: 'Comma-separated product packages (used for recurring sales attribution). Omit to keep the current packages unchanged; send the literal value [] to remove the product from all packages.',
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				default: 0,
				description: 'New price. Plain number only: up to 8 digits before the decimal point and up to 2 after.',
			},
			{
				displayName: 'Recurring',
				name: 'recurring',
				type: 'boolean',
				default: false,
				description: 'Whether the product is a recurring sale (sent to the API as isRecurringSale). A product cannot be both a recurring sale and a call product.',
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'New SKU',
			},
			{
				displayName: 'Tag',
				name: 'tag',
				type: 'string',
				default: '',
				description: 'New product tag',
			},
			{
				displayName: 'Update Historical Sales',
				name: 'updateHistoricalSales',
				type: 'boolean',
				default: false,
				description: 'Whether a cost change is propagated to the product\'s existing sales, updating their profit and ROAS',
			},
		],
	},
];
