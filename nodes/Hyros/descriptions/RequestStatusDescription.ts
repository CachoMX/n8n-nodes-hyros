import { INodeProperties } from 'n8n-workflow';

export const requestStatusOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['requestStatus'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get the processing status of an asynchronous write request',
				action: 'Get a request status',
			},
		],
		default: 'get',
	},
];

export const requestStatusFields: INodeProperties[] = [
	{
		displayName: 'Request ID',
		name: 'requestId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['requestStatus'],
				operation: ['get'],
			},
		},
		default: '',
		description: 'The request_id returned when the original write request was accepted. Writes are processed asynchronously: poll this endpoint to learn whether the write is still PENDING, has been PROCESSED, or FAILED. Statuses are retained for 2 hours. Once PROCESSED, the response also carries a snapshot of the resource the write produced. A request that stays PENDING is not a reason to resend the write, since that would duplicate it.',
	},
];
