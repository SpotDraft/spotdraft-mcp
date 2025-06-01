import { Tool } from "@modelcontextprotocol/sdk/types.js";
import spotdraftClient from "../spotdraft_client.js";

const getTemplatesTool: Tool = {
    name: "get_templates",
    description: "Retrieves a list of templates from SpotDraft. Uses API v2.1.",
    inputSchema: {
        type: "object",
        properties: {
            tags: {
                type: "array",
                items: {
                    type: "string",
                },
                description: "The tags (if any) to filter the templates by. Multiple tags can be specified. Only templates where the Template tags are a subset of the tags passed will be returned.",
            },
            tags_all: {
                type: "array",
                items: {
                    type: "string",
                },
                description: "The tags (if any) to filter the templates by. Multiple tags can be specified. Only templates where the tags passed are a subset of the Template tags will be returned.",
            },
            cp_types: {
                type: "string",
                description: "The type of Counterparty that can be added to contracts created from this template. Must be either 'Organisation' or 'Individual'.",
                enum: ["Organisation", "Individual"],
            },
            cp_types_all: {
                type: "boolean",
                description: "When a template has multiple counterparties, whether all counterparties should match the CP type given in cp_types. False by default.",
                default: false,
            },
        },
    },
};

interface GetTemplatesRequest {
    tags?: string[];
    tags_all?: string[];
    cp_types?: "Organisation" | "Individual";
    cp_types_all?: boolean;
}

const getTemplates = async (request: GetTemplatesRequest): Promise<any> => {
    const endpoint = "/v2.1/public/templates/";
    const params = new URLSearchParams();

    if (request.tags) {
        request.tags.forEach(tag => params.append("tags", tag));
    }
    if (request.tags_all) {
        request.tags_all.forEach(tag => params.append("tags_all", tag));
    }
    if (request.cp_types) {
        params.append("cp_types", request.cp_types);
    }
    if (request.cp_types_all !== undefined) {
        params.append("cp_types_all", request.cp_types_all.toString());
    }

    return spotdraftClient.get(endpoint, params);
};

export { getTemplatesTool, GetTemplatesRequest, getTemplates }; 