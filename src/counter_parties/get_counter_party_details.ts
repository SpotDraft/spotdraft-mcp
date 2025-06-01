import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getCounterPartyDetailsTool: Tool = {
  name: 'get_counter_party_details',
  description: 'Retrieves the details of a specific counterparty by its ID. Uses API v2.1.',
  inputSchema: {
    type: 'object',
    properties: {
      counterparty_id: {
        type: 'integer',
        description: 'The ID of the counterparty to retrieve.',
      },
    },
    required: ['counterparty_id'],
  },
};

interface GetCounterPartyDetailsRequest {
  counterparty_id: number;
}

const getCounterPartyDetails = async (request: GetCounterPartyDetailsRequest): Promise<any> => {
  if (!request.counterparty_id) {
    throw new Error('counterparty_id is a required field.');
  }
  const endpoint = `/v2.1/public/counter_parties/${request.counterparty_id}/`;
  return spotdraftClient.get(endpoint);
};

export { getCounterPartyDetails, GetCounterPartyDetailsRequest, getCounterPartyDetailsTool };
