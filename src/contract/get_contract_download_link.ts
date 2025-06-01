import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractDownloadLinkTool: Tool = {
  name: 'get_contract_download_link',
  description: 'Returns a download link for a copy of the contract. Uses API v2.1.',
  inputSchema: {
    type: 'object',
    properties: {
      composite_id: {
        type: 'string',
        description: 'ID of the Contract (e.g., T-123 or H-123).',
      },
    },
    required: ['composite_id'],
  },
};

interface GetContractDownloadLinkRequest {
  composite_id: string;
}

const getContractDownloadLink = async (request: GetContractDownloadLinkRequest): Promise<any> => {
  // This endpoint is a POST request without a body as per the OpenAPI spec
  // for operationId v2.1_public_contracts_download_link_create.
  const endpoint = `/v2.1/public/contracts/${request.composite_id}/download_link`;
  return spotdraftClient.post(endpoint);
};

export { getContractDownloadLink, GetContractDownloadLinkRequest, getContractDownloadLinkTool };
