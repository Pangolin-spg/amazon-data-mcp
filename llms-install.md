# Install Pangolinfo Amazon Data MCP

Use the hosted Streamable HTTP endpoint when the client supports custom headers. This is the preferred setup because no local package stays running.

## Remote Streamable HTTP

- Name: `pangolinfo-amazon-data`
- URL: `https://mcp.pangolinfo.com/mcp`
- Header: `Authorization: Bearer <PANGOLINFO_API_KEY>`

For a JSON-based client configuration:

```json
{
  "mcpServers": {
    "pangolinfo-amazon-data": {
      "url": "https://mcp.pangolinfo.com/mcp",
      "headers": {
        "Authorization": "Bearer <PANGOLINFO_API_KEY>"
      }
    }
  }
}
```

Never write a real key into a repository, shared config, screenshot, or chat transcript.

## Local stdio fallback

If the client cannot set HTTP headers, launch the official npm bridge:

```json
{
  "mcpServers": {
    "pangolinfo-amazon-data": {
      "command": "npx",
      "args": ["-y", "pangolinfo-amazon-data-mcp"],
      "env": {
        "PANGOLINFO_API_KEY": "<PANGOLINFO_API_KEY>"
      }
    }
  }
}
```

Requirements: Node.js 18 or newer and a Pangolinfo API key.

## Docker fallback

```bash
docker build -t pangolinfo-amazon-data-mcp .
docker run --rm -i -e PANGOLINFO_API_KEY pangolinfo-amazon-data-mcp
```

Set `PANGOLINFO_API_KEY` in the environment before running the container. Do not place the key in the image or Dockerfile.

## Verify

After connecting, ask the client to list tools. The server should report 19 business data tools plus the free `pangolinfo_capabilities` navigation tool. Then try a read-only request such as fetching an Amazon product by ASIN.

Product page: https://www.pangolinfo.com/amazon-data-mcp/

API key: https://tool.pangolinfo.com

Support: https://docs.pangolinfo.com/en-help-center/mcp/agents
