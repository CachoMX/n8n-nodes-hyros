import { INodeProperties } from 'n8n-workflow';

export const userInfoOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['userInfo'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get user account information',
				action: 'Get user info',
			},
		],
		default: 'get',
	},
];

export const userInfoFields: INodeProperties[] = [];
