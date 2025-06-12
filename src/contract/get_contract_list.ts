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
- contract_type_id - get contract types using get_contract_types tool

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


## Sorting (ALPHA)
The query parameter \`sort\` can be used to sort the contracts.
The parameter accepts a comma separated list of sort fields.
The sort fields can be prefixed with \`-\` to sort in descending order.

Following are some examples of query parameters applying the sorting:
- sortFilters=in_built_field,+inbuild_filed
- sortMetadataFilters=-key_pointer_name

- means descending + means ascending
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
      sortFilters: {
        type: 'string',
        description: 'Sort filters to apply to the contracts.',
      },
      sortMetadataFilters: {
        type: 'string',
        description: 'Sort filters to apply to the metadata fields.',
      },
    },
  },
};

interface GetContractListRequest {
  page?: number;
  limit?: number;
  filters: {};
  metadataFilters: {};
  sortFilters?: string;
  sortMetadataFilters?: string;
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

  let sortValue = '';
  if (request.sortFilters) {
    sortValue += request.sortFilters
      .split(',')
      .map((i) => {
        if (i.startsWith('-') || i.startsWith('+')) {
          return `${i.substring(0, 1)}filter__${i.slice(1)}`;
        }
        return `filter__${i}`;
      })
      .join(',');
  }
  if (request.sortMetadataFilters) {
    sortValue += request.sortMetadataFilters
      .split(',')
      .map((i) => {
        if (i.startsWith('-') || i.startsWith('+')) {
          return `${i.substring(0, 1)}filter_metadata__${i.slice(1)}`;
        }
        return `filter_metadata__${i}`;
      })
      .join(',');
  }
  if (sortValue) {
    params.append('sort', sortValue);
  }
  // console.log('Making request to ', endpoint, params.toString());
  return spotdraftClient.get(endpoint, params);
};

export { getContractList, GetContractListRequest, getContractListTool };
