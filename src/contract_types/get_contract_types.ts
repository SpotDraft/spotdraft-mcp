import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractTypesTool: Tool = {
  name: 'get_contract_types',
  description: `Retrieves a list of contract types from SpotDraft.`,
  inputSchema: {
    type: 'object',
    properties: {},
  },
};

interface GetContractTypesRequest {}

interface ContractType {
  id: number;
  name: string;
}

const getContractTypes = async (request: GetContractTypesRequest): Promise<ContractType[]> => {
  const endpoint = '/v2/public/contract_types/';
  return spotdraftClient.get(endpoint);
};

export { getContractTypes, GetContractTypesRequest, getContractTypesTool };
