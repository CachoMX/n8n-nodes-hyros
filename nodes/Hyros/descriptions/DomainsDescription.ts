import { INodeProperties } from 'n8n-workflow';

export const domainsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domains'],
			},
		},
		options: [
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many verified domains',
				action: 'Get many domains',
			},
		],
		default: 'getAll',
	},
];

export const domainsFields: INodeProperties[] = [
	// No additional fields needed for GET /domains
];
