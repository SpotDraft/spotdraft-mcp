import { Tool } from '@modelcontextprotocol/sdk/types.js';
import spotdraftClient from '../spotdraft_client.js';

const getTemplateMetadataTool: Tool = {
  name: 'get_template_metadata',
  description: 'Gets the list of fields required to create a contract with a given template. Uses API v2.1.',
  inputSchema: {
    type: 'object',
    properties: {
      template_id: {
        type: 'integer',
        description: 'The ID of the template.',
      },
    },
    required: ['template_id'],
  },
};

interface GetTemplateMetadataRequest {
  template_id: number;
}

const getTemplateMetadata = async (request: GetTemplateMetadataRequest): Promise<any> => {
  const endpoint = `/v2.1/public/templates/${request.template_id}/metadata`;
  return spotdraftClient.get(endpoint);
};

export { getTemplateMetadata, GetTemplateMetadataRequest, getTemplateMetadataTool };
