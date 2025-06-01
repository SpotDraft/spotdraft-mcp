import { Tool } from "@modelcontextprotocol/sdk/types.js";
import spotdraftClient from "../spotdraft_client.js";

const getContractListTool: Tool = {
    name: "get_contract_list",
    description: "Retrieves a list of contracts from SpotDraft. Uses API v2.1.",
    inputSchema: {
        type: "object",
        properties: {
            page: {
                type: "integer",
                description: "The page to return. Page numbers start at 1.",
                default: 1,
            },
            limit: {
                type: "integer",
                description: "The number of items to return per page. Max 100.",
                default: 10,
            },
            filter__client_email_address: {
                type: "string",
                description: "Filters on the counter party email. Does an exact match.",
            },
            filter__client_name: {
                type: "string",
                description: "Filters on the counter party name. Does an exact match.",
            },
        },
    },
};

interface GetContractListRequest {
    page?: number;
    limit?: number;
    filter__client_email_address?: string;
    filter__client_name?: string;
}

const getContractList = async (request: GetContractListRequest): Promise<any> => {
    const endpoint = "/v2.1/public/contracts/";
    const params = new URLSearchParams();

    if (request.page) {
        params.append("page", request.page.toString());
    }
    if (request.limit) {
        params.append("limit", request.limit.toString());
    }
    if (request.filter__client_email_address) {
        params.append("filter__client_email_address", request.filter__client_email_address);
    }
    if (request.filter__client_name) {
        params.append("filter__client_name", request.filter__client_name);
    }

    return spotdraftClient.get(endpoint, params);
};

export { getContractListTool, GetContractListRequest, getContractList };