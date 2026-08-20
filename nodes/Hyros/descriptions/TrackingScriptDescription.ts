import { INodeProperties } from 'n8n-workflow';

export const trackingScriptOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['trackingScript'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get the tracking script for a domain',
				action: 'Get tracking script',
			},
		],
		default: 'get',
	},
];

export const trackingScriptFields: INodeProperties[] = [
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['trackingScript'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Delete Tracking Script Params',
				name: 'deleteTrackingScriptParams',
				type: 'boolean',
				default: false,
				description: 'Whether the Universal Script automatically hides the tracking parameters in the URL after use. This setting is persisted as user metadata.',
			},
			{
				displayName: 'Domain',
				name: 'domain',
				type: 'string',
				default: '',
				description: 'The domain for which to retrieve the tracking script. If not provided, the default tracking script will be returned.',
			},
			{
				displayName: 'Embed on Iframes',
				name: 'embed',
				type: 'boolean',
				default: false,
				description: 'Whether the Universal script is embedded on iframes',
			},
			{
				displayName: 'Ignore Previous URL',
				name: 'ignorePrevUrl',
				type: 'boolean',
				default: false,
				description: 'Whether sources from the previous URL are ignored during attribution',
			},
			{
				displayName: 'SPA Tracking',
				name: 'spa',
				type: 'boolean',
				default: false,
				description: 'Whether to enable tracking of clicks and emails on URL change for Single Page Applications (SPA)',
			},
		],
	},
];
