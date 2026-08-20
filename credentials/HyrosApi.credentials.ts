import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class HyrosApi implements ICredentialType {
	name = 'hyrosApi';
	displayName = 'Hyros API';
	documentationUrl = 'https://docs.hyros.com/';
	icon: Icon = 'file:../nodes/Hyros/hyros.svg';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Hyros API key. You can find this in your Hyros account settings.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://api.hyros.com/v1',
			required: true,
			description: 'The base URL for the Hyros API',
		},
		{
			displayName: 'Accessible Account ID',
			name: 'accessibleAccountId',
			type: 'string',
			default: '',
			description: 'Agencies only: external ID of a connected client account to act on. Every request runs against that account instead of your own (sent as the Accessible-Account-Id header). Leave empty to operate on your own account.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'API-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/api/v1.0/user-info',
			method: 'GET',
		},
	};
}
