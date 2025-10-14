import { INodeProperties } from 'n8n-workflow';

export const leadOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['lead'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new lead',
				action: 'Create a lead',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a lead by email',
				action: 'Get a lead',
			},
			{
				name: 'Get Journey',
				value: 'getJourney',
				description: 'Get the complete customer journey for a lead',
				action: 'Get lead journey',
			},
		],
		default: 'create',
	},
];

export const leadFields: INodeProperties[] = [
	// Create Lead
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create', 'get', 'getJourney'],
			},
		},
		default: '',
		description: 'Email address of the lead',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['lead'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Phone number of the lead',
			},
			{
				displayName: 'First Name',
				name: 'firstName',
				type: 'string',
				default: '',
				description: 'First name of the lead',
			},
			{
				displayName: 'Last Name',
				name: 'lastName',
				type: 'string',
				default: '',
				description: 'Last name of the lead',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				description: 'Comma-separated list of tags to apply to the lead',
			},
			{
				displayName: 'Source',
				name: 'source',
				type: 'string',
				default: '',
				description: 'Traffic source for the lead',
			},
			{
				displayName: 'Sub Source',
				name: 'subSource',
				type: 'string',
				default: '',
				description: 'Sub source for more granular tracking',
			},
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				default: '',
				description: 'IP address of the lead',
			},
			{
				displayName: 'User Agent',
				name: 'userAgent',
				type: 'string',
				default: '',
				description: 'User agent string from the browser',
			},
			{
				displayName: 'Referrer',
				name: 'referrer',
				type: 'string',
				default: '',
				description: 'Referrer URL',
			},
			{
				displayName: 'Landing Page',
				name: 'landingPage',
				type: 'string',
				default: '',
				description: 'Landing page URL',
			},
			{
				displayName: 'Page URL',
				name: 'pageUrl',
				type: 'string',
				default: '',
				description: 'Current page URL',
			},
			{
				displayName: 'HY ID',
				name: 'hyId',
				type: 'string',
				default: '',
				description: 'Hyros tracking ID from the cookie',
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
				displayName: 'TikTok Click ID',
				name: 'ttclid',
				type: 'string',
				default: '',
				description: 'TikTok click ID',
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
				description: 'Timestamp of the lead creation (ISO 8601 format)',
			},
		],
	},
];
