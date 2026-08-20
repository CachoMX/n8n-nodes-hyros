import { INodeProperties } from 'n8n-workflow';

export const webhookSubscriptionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhookSubscription'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a webhook subscription',
				action: 'Create a webhook subscription',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook subscription',
				action: 'Delete a webhook subscription',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many webhook subscriptions',
				action: 'Get many webhook subscriptions',
			},
		],
		default: 'getAll',
	},
];

export const webhookSubscriptionFields: INodeProperties[] = [
	// Create
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhookSubscription'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name of the subscription',
	},
	{
		displayName: 'Target URL',
		name: 'targetUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhookSubscription'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Public HTTP/HTTPS URL where the event payloads are sent',
	},
	{
		displayName: 'Event Types',
		name: 'eventTypes',
		type: 'multiOptions',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhookSubscription'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Call Attributed',
				value: 'call.attributed',
			},
			{
				name: 'Lead Opted In',
				value: 'lead.opted.in',
			},
			{
				name: 'Lead Opted In First Time',
				value: 'lead.opted.in.first.time',
			},
			{
				name: 'Lead Origin Assigned',
				value: 'lead.origin.assigned',
			},
			{
				name: 'Lead Stage Changed',
				value: 'lead.stage.changed',
			},
			{
				name: 'Lead Tag Added',
				value: 'lead.tag.added',
			},
			{
				name: 'Lead Tag Removed',
				value: 'lead.tag.removed',
			},
			{
				name: 'Sale Attributed',
				value: 'sale.attributed',
			},
			{
				name: 'Sale Refunded',
				value: 'sale.refunded',
			},
			{
				name: 'Subscription Created',
				value: 'subscription.created',
			},
			{
				name: 'Subscription Status Changed',
				value: 'subscription.status.changed',
			},
		],
		default: [],
		description: 'Event types to send to the target URL. At least one is required. The create response includes a secretKey for validating the HMAC signature of deliveries; it is only returned once, so store it.',
	},
	// Delete
	{
		displayName: 'External ID',
		name: 'externalId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['webhookSubscription'],
				operation: ['delete'],
			},
		},
		default: '',
		description: 'Identifier of the subscription to delete (e.g. sub-2a475f6baf8f416bac9ff60e1a0fabb5), as returned by Create or Get Many',
	},
];
