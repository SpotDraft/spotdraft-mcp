import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractApprovalsTool: Tool = {
  name: 'get_contract_approvals',
  description: 'Retrieves a list of approvals for a given contract from SpotDraft. Uses API v2.1.',
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

interface GetContractApprovalsRequest {
  contract_id: string;
}

const getContractApprovals = async (request: GetContractApprovalsRequest): Promise<any> => {
  if (!request.contract_id) {
    throw new Error('contract_id is required');
  }
  const endpoint = `/v2.1/public/contracts/approvals/${request.contract_id}/`;

  return spotdraftClient.get(endpoint);
};

export { getContractApprovals, GetContractApprovalsRequest, getContractApprovalsTool };
