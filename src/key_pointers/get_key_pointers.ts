import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getKeyPointersTool: Tool = {
  name: 'get_key_pointers',
  description: `Gets all the key pointers for the Organization from SpotDraft. Uses API v2.1.

Key pointers are metadata fields that can be used to filter contracts. This endpoint returns all available key pointers for a specific contract type.
  `,
  inputSchema: {
    type: 'object',
    properties: {
      contract_type_id: {
        type: 'integer',
        description: 'ID of the Contract Type. Use get_contract_types to get the list and ID of contract types.',
      },
      is_external: {
        type: 'boolean',
        description: 'Set to True to get only key pointers from external sections.',
      },
    },
    required: ['contract_type_id'],
  },
};

interface GetKeyPointersRequest {
  contract_type_id: number;
  is_external?: boolean;
}

const getKeyPointers = async (request: GetKeyPointersRequest): Promise<any> => {
  const endpoint = '/v2.1/public/key_pointers/';
  const params = new URLSearchParams();

  params.append('contract_type_id', request.contract_type_id.toString());

  if (request.is_external !== undefined) {
    params.append('is_external', request.is_external.toString());
  }

  return spotdraftClient.get(endpoint, params).then((result) => {
    if (result.length === 0) {
      return [];
    }
    const newResults = [];
    for (const obj of result) {
      if (obj.descriptors.length === 0) {
        continue;
      }
      if (obj.descriptors[0].parent_type === 'currency') {
        newResults.push({
          ...obj,
          descriptors: [
            {
              variable: obj.descriptors[0].parent_variable,
              display_label: obj.descriptors[0].display_label.split(' > ')[0],
              type: 'currency',
            },
          ],
        });
      } else if (obj.descriptors[0].parent_type === 'dropdown') {
        newResults.push({
          ...obj,
          descriptors: [
            {
              variable: obj.descriptors[0].variable,
              display_label: obj.descriptors[0].display_label,
              type: 'dropdown',
              options: obj.descriptors[0].options,
            },
          ],
        });
      } else if (obj.descriptors[0].parent_type === 'duration') {
        newResults.push({
          ...obj,
          descriptors: [
            {
              variable: obj.descriptors[0].parent_variable,
              display_label: obj.descriptors[0].display_label.split(' > ')[0],
              type: 'duration',
            },
          ],
        });
      } else {
        newResults.push({
          ...obj,
          descriptors: [
            {
              variable: obj.descriptors[0].variable,
              display_label: obj.descriptors[0].display_label,
              type: obj.descriptors[0].type,
            },
          ],
        });
      }
    }
    return newResults;
  });
};

export { getKeyPointers, GetKeyPointersRequest, getKeyPointersTool };
