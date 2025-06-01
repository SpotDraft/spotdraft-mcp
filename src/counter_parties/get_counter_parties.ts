import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getCounterPartiesTool: Tool = {
  name: 'get_counter_parties',
  description: 'Retrieves a list of counterparties from SpotDraft. Uses API v2.1.',
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
      filter__client_email_address: {
        type: 'string',
        description: 'Filters on the counter party email. Does an exact match.',
      },
      // Note: filter_custom__<custom_field_name> is not directly added here
      // as it's a dynamic key. Users would need to pass the full key-value pair
      // if the API supports arbitrary query parameters beyond the defined schema.
      // For now, we will stick to explicitly defined parameters.
    },
  },
};

interface GetCounterPartiesRequest {
  page?: number;
  limit?: number;
  filter__client_email_address?: string;
  // If specific custom filters are commonly used, they could be added explicitly here.
  // e.g., filter_custom__vendor_id?: string;
}

const getCounterParties = async (request: GetCounterPartiesRequest): Promise<any> => {
  const endpoint = '/v2.1/public/counter_parties/';
  const params = new URLSearchParams();

  if (request.page) {
    params.append('page', request.page.toString());
  }
  if (request.limit) {
    params.append('limit', request.limit.toString());
  }
  if (request.filter__client_email_address) {
    params.append('filter__client_email_address', request.filter__client_email_address);
  }

  // Handling for generic custom filters if they were to be supported more directly:
  // for (const key in request) {
  //     if (key.startsWith("filter_custom__") && request[key as keyof GetCounterPartiesRequest]) {
  //         params.append(key, request[key as keyof GetCounterPartiesRequest]!.toString());
  //     }
  // }

  return spotdraftClient.get(endpoint, params);
};

export { getCounterParties, GetCounterPartiesRequest, getCounterPartiesTool };
