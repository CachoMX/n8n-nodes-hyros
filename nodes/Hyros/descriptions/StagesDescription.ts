import { INodeProperties } from 'n8n-workflow';

export const stagesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stages'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many lead stages',
				action: 'Get many stages',
			},
		],
		default: 'getAll',
	},
];

export const stagesFields: INodeProperties[] = [
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['stages'],
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
				resource: ['stages'],
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
				resource: ['stages'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'The name to search stages by',
			},
			{
				displayName: 'Page ID',
				name: 'pageId',
				type: 'string',
				default: '',
				description: 'The ID of the next page to be retrieved',
			},
			{
				displayName: 'Stage From Date',
				name: 'stageFromDate',
				type: 'dateTime',
				default: '',
				description: 'Only the leads the stage was applied to on or after this date are counted (ISO 8601 format). Without the date pair, each stage counts the leads whose current stage it is; with it, the count covers every lead that entered the stage inside the period, so a lead that moved through several stages is counted under each. The stages returned are unaffected. The generic From Date and To Date parameters are not honoured on this endpoint.',
			},
			{
				displayName: 'Stage To Date',
				name: 'stageToDate',
				type: 'dateTime',
				default: '',
				description: 'Only the leads the stage was applied to on or before this date are counted (ISO 8601 format). Must not be earlier than Stage From Date.',
			},
		],
	},
];
