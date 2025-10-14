import { INodeProperties } from 'n8n-workflow';

export const subscriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a subscription by ID',
				action: 'Get a subscription',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new subscription',
				action: 'Create a subscription',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a subscription',
				action: 'Update a subscription',
			},
		],
		default: 'create',
	},
];

export const subscriptionFields: INodeProperties[] = [
	// Get Subscription
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['get', 'update'],
			},
		},
		default: '',
		description: 'Unique subscription identifier',
	},
	// Create Subscription
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Customer email address',
	},
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Unique subscription identifier',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Product ID',
				name: 'productId',
				type: 'string',
				default: '',
				description: 'Product identifier',
			},
			{
				displayName: 'Product Name',
				name: 'productName',
				type: 'string',
				default: '',
				description: 'Product name',
			},
			{
				displayName: 'Plan Name',
				name: 'planName',
				type: 'string',
				default: '',
				description: 'Subscription plan name',
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'Subscription amount',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (e.g., USD, EUR)',
			},
			{
				displayName: 'Billing Interval',
				name: 'billingInterval',
				type: 'options',
				options: [
					{
						name: 'Daily',
						value: 'daily',
					},
					{
						name: 'Weekly',
						value: 'weekly',
					},
					{
						name: 'Monthly',
						value: 'monthly',
					},
					{
						name: 'Quarterly',
						value: 'quarterly',
					},
					{
						name: 'Yearly',
						value: 'yearly',
					},
				],
				default: 'monthly',
				description: 'Billing interval',
			},
			{
				displayName: 'Trial Period Days',
				name: 'trialPeriodDays',
				type: 'number',
				default: 0,
				description: 'Number of trial days',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Trialing',
						value: 'trialing',
					},
					{
						name: 'Past Due',
						value: 'past_due',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Unpaid',
						value: 'unpaid',
					},
				],
				default: 'active',
				description: 'Subscription status',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Subscription start date (ISO 8601 format)',
			},
			{
				displayName: 'Next Billing Date',
				name: 'nextBillingDate',
				type: 'dateTime',
				default: '',
				description: 'Next billing date (ISO 8601 format)',
			},
			{
				displayName: 'Cancel At Period End',
				name: 'cancelAtPeriodEnd',
				type: 'boolean',
				default: false,
				description: 'Whether subscription cancels at period end',
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
				description: 'Subscription creation timestamp (ISO 8601 format)',
			},
		],
	},
	// Update Subscription
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'Subscription amount',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Trialing',
						value: 'trialing',
					},
					{
						name: 'Past Due',
						value: 'past_due',
					},
					{
						name: 'Cancelled',
						value: 'cancelled',
					},
					{
						name: 'Unpaid',
						value: 'unpaid',
					},
				],
				default: 'active',
				description: 'Subscription status',
			},
			{
				displayName: 'Next Billing Date',
				name: 'nextBillingDate',
				type: 'dateTime',
				default: '',
				description: 'Next billing date (ISO 8601 format)',
			},
			{
				displayName: 'Cancel At Period End',
				name: 'cancelAtPeriodEnd',
				type: 'boolean',
				default: false,
				description: 'Whether subscription cancels at period end',
			},
			{
				displayName: 'Cancelled At',
				name: 'cancelledAt',
				type: 'dateTime',
				default: '',
				description: 'Cancellation date (ISO 8601 format)',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags',
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
