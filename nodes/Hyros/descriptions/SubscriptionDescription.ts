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
				description: 'Get subscriptions with optional filtering',
				action: 'Get subscriptions',
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
				description: 'Update subscription(s)',
				action: 'Update subscriptions',
			},
		],
		default: 'create',
	},
];

export const subscriptionFields: INodeProperties[] = [
	// Get Subscriptions (GET /subscriptions with query params)
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['subscription'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated subscription IDs',
			},
			{
				displayName: 'Emails',
				name: 'emails',
				type: 'string',
				default: '',
				description: 'Comma-separated emails',
			},
			{
				displayName: 'Lead IDs',
				name: 'leadIds',
				type: 'string',
				default: '',
				description: 'Comma-separated lead IDs',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Filter subscriptions from this date (ISO 8601 format)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Filter subscriptions to this date (ISO 8601 format)',
			},
		],
	},
	// Create Subscription (POST /subscriptions)
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
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Subscription state',
			},
			{
				displayName: 'Is Cancelled',
				name: 'isCancelled',
				type: 'boolean',
				default: false,
				description: 'Whether subscription is cancelled',
			},
			{
				displayName: 'Cancel Date',
				name: 'cancelDate',
				type: 'dateTime',
				default: '',
				description: 'Cancellation date (ISO 8601 format)',
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
	// Update Subscriptions (PUT /subscriptions with body params)
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
				displayName: 'IDs',
				name: 'ids',
				type: 'string',
				default: '',
				description: 'Comma-separated subscription IDs to update',
			},
			{
				displayName: 'Subscription Plan Name',
				name: 'subscriptionPlanName',
				type: 'string',
				default: '',
				description: 'Subscription plan name',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Subscription state',
			},
			{
				displayName: 'Is Cancelled',
				name: 'isCancelled',
				type: 'boolean',
				default: false,
				description: 'Whether subscription is cancelled',
			},
			{
				displayName: 'Cancel Date',
				name: 'cancelDate',
				type: 'dateTime',
				default: '',
				description: 'Cancellation date (ISO 8601 format)',
			},
		],
	},
];
