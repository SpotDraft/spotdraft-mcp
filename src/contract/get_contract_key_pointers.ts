import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractKeyPointersTool: Tool = {
  name: 'get_contract_key_pointers',
  description: 'Retrieves a list of key pointers for a given contract ID. Uses API v2.',
  inputSchema: {
    type: 'object',
    properties: {
      contract_id: {
        type: 'string',
        description:
          'ID of the Contract. Should be of the form T-123 or H-123. T stands for Template contracts and H stands for Historical contracts.',
      },
    },
    required: ['contract_id'],
  },
};

interface GetContractKeyPointersRequest {
  contract_id: string;
}

const getContractKeyPointers = async (request: GetContractKeyPointersRequest): Promise<any> => {
  const endpoint = `/v2.1/public/contracts/${request.contract_id}/key_pointers`;
  return spotdraftClient.get(endpoint);
};

export { getContractKeyPointers, GetContractKeyPointersRequest, getContractKeyPointersTool };
