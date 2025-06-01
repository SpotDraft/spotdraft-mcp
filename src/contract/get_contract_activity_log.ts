import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractActivityLogTool: Tool = {
  name: 'get_contract_activity_log',
  description: 'Get comments in the Contract Activity Log. Uses API v2.1.',
  inputSchema: {
    type: 'object',
    properties: {
      contract_id: {
        type: 'integer',
        description: 'Integer ID of the Contract.',
      },
      page: {
        type: 'integer',
        description: 'The page to return. Page numbers start at 1.',
        default: 1,
      },
      limit: {
        type: 'integer',
        description: 'The number of items to return per page. Max 100.',
        default: 10,
      },
    },
    required: ['contract_id'],
  },
};

interface GetContractActivityLogRequest {
  contract_id: number;
  page?: number;
  limit?: number;
}

const getContractActivityLog = async (request: GetContractActivityLogRequest): Promise<any> => {
  const endpoint = `/v2.1/public/contracts/${request.contract_id}/comments/`;
  const params = new URLSearchParams();

  if (request.page) {
    params.append('page', request.page.toString());
  }
  if (request.limit) {
    params.append('limit', request.limit.toString());
  }

  return spotdraftClient.get(endpoint, params);
};

export { getContractActivityLog, GetContractActivityLogRequest, getContractActivityLogTool };
