#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequest, CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';

import {
  GetContractActivityLogRequest,
  getContractActivityLog,
  getContractActivityLogTool,
} from './contract/get_contract_activity_log.js';
import {
  GetContractDownloadLinkRequest,
  getContractDownloadLink,
  getContractDownloadLinkTool,
} from './contract/get_contract_download_link.js';
import {
  GetContractKeyPointersRequest,
  getContractKeyPointers,
  getContractKeyPointersTool,
} from './contract/get_contract_key_pointers.js';
import { GetContractListRequest, getContractList, getContractListTool } from './contract/get_contract_list.js';
import { GetContractStatusRequest, getContractStatus, getContractStatusTool } from './contract/get_contract_status.js';

import {
  GetTemplateDetailsRequest,
  getTemplateDetails,
  getTemplateDetailsTool,
} from './templates/get_template_details.js';
import {
  GetTemplateMetadataRequest,
  getTemplateMetadata,
  getTemplateMetadataTool,
} from './templates/get_template_metadata.js';
import { GetTemplatesRequest, getTemplates, getTemplatesTool } from './templates/get_templates.js';

import {
  GetCounterPartiesRequest,
  getCounterParties,
  getCounterPartiesTool,
} from './counter_parties/get_counter_parties.js';
import {
  GetCounterPartyDetailsRequest,
  getCounterPartyDetails,
  getCounterPartyDetailsTool,
} from './counter_parties/get_counter_party_details.js';

async function main() {
  const spotdraftClientId = process.env.SPOTDRAFT_CLIENT_ID;
  const spotdraftClientSecret = process.env.SPOTDRAFT_CLIENT_SECRET;

  if (!spotdraftClientId || !spotdraftClientSecret) {
    console.error('Please set SPOTDRAFT_CLIENT_ID and SPOTDRAFT_CLIENT_SECRET environment variables');
    process.exit(1);
  }

  const server = new Server(
    {
      name: 'SpotDraft MCP Server',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    },
  );

  server.setRequestHandler(CallToolRequestSchema, async (request: CallToolRequest) => {
    // console.info("Received CallToolRequest: ", request.params.name);

    try {
      const { name, arguments: args } = request.params;
      let result: any;

      switch (name) {
        case getContractListTool.name:
          result = await getContractList(args as unknown as GetContractListRequest);
          break;
        case getContractDownloadLinkTool.name:
          result = await getContractDownloadLink(args as unknown as GetContractDownloadLinkRequest);
          break;
        case getContractStatusTool.name:
          result = await getContractStatus(args as unknown as GetContractStatusRequest);
          break;
        case getContractActivityLogTool.name:
          result = await getContractActivityLog(args as unknown as GetContractActivityLogRequest);
          break;
        case getContractKeyPointersTool.name:
          result = await getContractKeyPointers(args as unknown as GetContractKeyPointersRequest);
          break;
        case getTemplatesTool.name:
          result = await getTemplates(args as unknown as GetTemplatesRequest);
          break;
        case getTemplateDetailsTool.name:
          result = await getTemplateDetails(args as unknown as GetTemplateDetailsRequest);
          break;
        case getTemplateMetadataTool.name:
          result = await getTemplateMetadata(args as unknown as GetTemplateMetadataRequest);
          break;
        case getCounterPartiesTool.name:
          result = await getCounterParties(args as unknown as GetCounterPartiesRequest);
          break;
        case getCounterPartyDetailsTool.name:
          result = await getCounterPartyDetails(args as unknown as GetCounterPartyDetailsRequest);
          break;
        default:
          throw new Error(`Unknown tool: ${name}`);
      }

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              result,
            }),
          },
        ],
      };
    } catch (error) {
      console.error('Error executing tool: ', error);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({
              error: error instanceof Error ? error.message : String(error),
            }),
          },
        ],
      };
    }
  });

  server.setRequestHandler(ListToolsRequestSchema, async () => {
    // console.info("Received ListToolsRequest");
    return {
      tools: [
        getContractListTool,
        getContractDownloadLinkTool,
        getContractStatusTool,
        getContractActivityLogTool,
        getContractKeyPointersTool,
        getTemplatesTool,
        getTemplateDetailsTool,
        getTemplateMetadataTool,
        getCounterPartiesTool,
        getCounterPartyDetailsTool,
      ],
    };
  });

  const transport = new StdioServerTransport();
  // console.log("Connecting SpotDraft MCP server to transport...");
  await server.connect(transport);

  // console.log("SpotDraft MCP Server running on stdio");
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
