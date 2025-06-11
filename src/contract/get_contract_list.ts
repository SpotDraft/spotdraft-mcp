import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getContractListTool: Tool = {
  name: 'get_contract_list',
  description: `Retrieves a list of contracts from SpotDraft. Uses API v2.1.
The query parameters can be used to filter the contracts.

Filters can be applied to the following in built fields:
- client_email_address
- client_name
- created_at
- expiring_at
- last_updated_on

All in built fields can be used with the following operators:
- $eq (equal to)
- $ne (not equal to)
- $gt (greater than)
- $gte (greater than or equal to)
- $lt (less than)
- $lte (less than or equal to)

Following are some examples of query parameters applying the filters:
- client_name[$eq]=John Doe
- contract_kind[$ne]=UPLOAD_SIGN
- contract_kind[$in]=TEMPLATE,UPLOAD_SIGN
- expiring_at[$gt]=2025-06-07
- expiring_at[$gte]=2025-06-07T00:00:00Z
- expiring_at[$lt]=2025-06-07T00:00:00Z
- expiring_at[$lte]=2025-06-07T00:00:00Z


Filters can also be applied to the metadata fields as returned by the \`get_key_pointers\` tool. 
- key_pointer_name[$eq]=Contract 1
  `,
  inputSchema: {
    type: 'object',
    properties: {
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
      filters: {
        type: 'object',
        description: 'Filters to apply to the contracts.',
      },
      metadataFilters: {
        type: 'object',
        description: 'Filters to apply to the metadata fields.',
      },
    },
  },
};

interface GetContractListRequest {
  page?: number;
  limit?: number;
  filters: {};
  metadataFilters: {};
}

const getContractList = async (request: GetContractListRequest): Promise<any> => {
  const endpoint = '/v2.1/public/contracts/';
  const params = new URLSearchParams();

  if (request.page) {
    params.append('page', request.page.toString());
  }
  if (request.limit) {
    params.append('limit', request.limit.toString());
  }
  if (request.filters) {
    Object.entries(request.filters).forEach(([key, value]) => {
      params.append(`filter__${key}`, value as string);
    });
  }
  if (request.metadataFilters) {
    Object.entries(request.metadataFilters).forEach(([key, value]) => {
      params.append(`filter_metadata__${key}`, value as string);
    });
  }
  console.log('Making request to ', endpoint, params.toString());
  return spotdraftClient.get(endpoint, params);
};

export { getContractList, GetContractListRequest, getContractListTool };
