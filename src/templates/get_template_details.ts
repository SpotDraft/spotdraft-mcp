import { Tool } from "@modelcontextprotocol/sdk/types.js";
import spotdraftClient from "../spotdraft_client.js";

const getTemplateDetailsTool: Tool = {
    name: "get_template_details",
    description: "Get details for a contract template. Uses API v2.1.",
    inputSchema: {
        type: "object",
        properties: {
            template_id: {
                type: "integer",
                description: "The ID of the template.",
            },
        },
        required: ["template_id"],
    },
};

interface GetTemplateDetailsRequest {
    template_id: number;
}

const getTemplateDetails = async (request: GetTemplateDetailsRequest): Promise<any> => {
    const endpoint = `/v2.1/public/templates/${request.template_id}/`;
    return spotdraftClient.get(endpoint);
};

export { getTemplateDetailsTool, GetTemplateDetailsRequest, getTemplateDetails }; 