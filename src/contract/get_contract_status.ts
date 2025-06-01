import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractStatusTool: Tool = {
  name: 'get_contract_status',
  description: 'Get the status for the requested contract ID. Uses API v2.1.',
  inputSchema: {
    type: 'object',
    properties: {
      contract_id: {
        type: 'string',
        description: 'ID of the Contract (e.g., T-123 or H-123).',
      },
    },
    required: ['contract_id'],
  },
};

interface GetContractStatusRequest {
  contract_id: string;
}

const getContractStatus = async (request: GetContractStatusRequest): Promise<any> => {
  const endpoint = `/v2.1/public/contracts/${request.contract_id}/status`;
  return spotdraftClient.get(endpoint);
};

export { getContractStatus, GetContractStatusRequest, getContractStatusTool };
