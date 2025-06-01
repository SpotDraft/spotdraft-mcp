# SpotDraft MCP Server

Integrate the SpotDraft API into agentic workflows via MCP.

This server provides tools to interact with SpotDraft's contract management features.

## Tools

### Contract Management

1.  `get_contract_list`: Retrieves a list of contracts.
2.  `get_contract_download_link`: Obtains a download link for a contract.
3.  `get_contract_status`: Gets the status of a specific contract.
4.  `get_contract_activity_log`: Retrieves the activity log (comments) for a contract.
5.  `get_contract_key_pointers`: Fetches key pointers for a specific contract.

### Template Management

6.  `get_templates`: Retrieves a list of contract templates.
7.  `get_template_details`: Fetches details for a specific contract template.
8.  `get_template_metadata`: Fetches metadata for a specific contract template.

### Counter Party Management

9.  `get_counter_parties`: Retrieves a list of counter parties.
10. `get_counter_party_details`: Fetches details for a specific counter party.

## Alpha Software Disclaimer

**This software is currently in Alpha and is not covered by any support SLA. It should not be used in production environments.**

## Setup

### Credentials

You will need a Client ID and Client Secret from your SpotDraft account.

### Environment Variables

Set the following environment variables before running the server:

- `SPOTDRAFT_CLIENT_ID`: Your SpotDraft API Client ID.
- `SPOTDRAFT_CLIENT_SECRET`: Your SpotDraft API Client Secret.
- `SPOTDRAFT_BASE_URL` (Optional): The base URL for the SpotDraft API. Defaults to `https://api.spotdraft.com/api`. You might need to change this based on your data residency region (e.g., `https://api.us.spotdraft.com/api`, `https://api.eu.spotdraft.com/api`).

### Usage with Claude Desktop

To use this with Claude Desktop, add the following to your `claude_desktop_config.json`:

#### NPX

```json
{
  "mcpServers": {
    "spotdraft": {
      "command": "npx",
      "args": ["@spotdraft/spotdraft-mcp"],
      "env": {
        "SPOTDRAFT_CLIENT_ID": "<YOUR_CLIENT_ID>",
        "SPOTDRAFT_CLIENT_SECRET": "<YOUR_CLIENT_SECRET>",
        "SPOTDRAFT_BASE_URL": "<SPOTDRAFT_BASE_URL>" (optional)
      }
    }
  }
}
```
