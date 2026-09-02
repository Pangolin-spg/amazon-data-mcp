# Pangolinfo Amazon Data MCP

[![Listed on mcpservers.org](https://mcpservers.org/badge.svg)](https://mcpservers.org/servers/pangolin-spg/amazon-data-mcp)

[Pangolinfo Amazon Data MCP](https://www.pangolinfo.com/amazon-data-mcp/) gives AI agents real-time access to Amazon commerce intelligence, WIPO design-patent data, Google Trends and search intelligence, and local market data.

This package is Pangolinfo's official stdio bridge to the hosted Streamable HTTP MCP server. It discovers the current remote tool schemas at startup and forwards MCP tool calls without storing your API key or result data.

## Capabilities

The server exposes **19 business data tools**, plus the free `pangolinfo_capabilities` navigation tool:

- Amazon research: product search and detail, reviews, delivery estimates, best sellers, new releases, seller catalogs, category products, and Rufus recommendations.
- Market selection: category discovery and trees, category metrics, niche filtering, and category paths.
- Broader intelligence: WIPO design-patent and litigation-risk search, Google SERP/AI Overview search, Google Trends, Google Maps local search, and a generic Amazon URL scraper.

See the full product overview and current capability details at [pangolinfo.com/amazon-data-mcp](https://www.pangolinfo.com/amazon-data-mcp/).

## Requirements

- Node.js 18 or newer
- A Pangolinfo API key

## Run with npx

```bash
PANGOLINFO_API_KEY="your-key" npx -y pangolinfo-amazon-data-mcp
```

Do not put a production key in source code or commit it to Git.

## MCP client configuration

For clients that launch local stdio servers:

```json
{
  "mcpServers": {
    "pangolinfo-amazon-data": {
      "command": "npx",
      "args": ["-y", "pangolinfo-amazon-data-mcp"],
      "env": {
        "PANGOLINFO_API_KEY": "your-key"
      }
    }
  }
}
```

Clients with native Streamable HTTP support can connect directly:

- Endpoint: `https://mcp.pangolinfo.com/mcp`
- Header: `Authorization: Bearer YOUR_PANGOLINFO_API_KEY`

Agent-oriented installation instructions are also available in [`llms-install.md`](llms-install.md).

## Run with Docker

Pull the public multi-platform image from Docker Hub or GitHub Container Registry:

```bash
docker pull pangolinfo/amazon-data-mcp:latest
docker pull ghcr.io/pangolin-spg/amazon-data-mcp:latest
```

Run it as a stdio MCP server while passing the key only at runtime:

```bash
docker run --rm -i \
  -e PANGOLINFO_API_KEY \
  pangolinfo/amazon-data-mcp:latest
```

Or build the official bridge locally:

```bash
docker build -t pangolinfo-amazon-data-mcp .
```

Run the local image:

```bash
docker run --rm -i -e PANGOLINFO_API_KEY pangolinfo-amazon-data-mcp
```

Set `PANGOLINFO_API_KEY` in your shell or secret manager. Do not bake it into the image, Dockerfile, or source tree.

## How the bridge works

The package opens an authenticated Streamable HTTP connection to Pangolinfo, then exposes the remote `tools/list` and `tools/call` methods over local stdio. Tool definitions therefore stay synchronized with the hosted service; the package contains no embedded customer data and does not log credentials.

An optional `PANGOLINFO_MCP_URL` environment variable can override the endpoint for approved testing environments. For safety, only HTTPS URLs are accepted.

## Links

- [Amazon Data MCP product page](https://www.pangolinfo.com/amazon-data-mcp/)
- [Amazon Scraper API](https://www.pangolinfo.com/amazon-scraper-api/)
- [AI Overview SERP API](https://www.pangolinfo.com/ai-overview-serp-api/)
- [Amazon Niche Data API](https://www.pangolinfo.com/amazon-niche-data-api/)
- [Amazon Alexa API](https://www.pangolinfo.com/amazon-alexa-api/)
- [Pangolinfo website](https://www.pangolinfo.com/)
- [GitHub repository](https://github.com/Pangolin-spg/amazon-data-mcp)
- [Docker Hub image](https://hub.docker.com/r/pangolinfo/amazon-data-mcp)
- [Canonical MCP Registry source](https://github.com/Pangolin-spg/pangolinfo-mcp)
- [Issue tracker](https://github.com/Pangolin-spg/amazon-data-mcp/issues)
- [MCP client setup guide](https://docs.pangolinfo.com/en-help-center/mcp/agents)
- [Amazon API documentation](https://docs.pangolinfo.com/en-api-reference/amazonApi/amazonAPI)
- [AI Overview API documentation](https://docs.pangolinfo.com/en-api-reference/serpApi/aiOverview)
- [Amazon Niche API documentation](https://docs.pangolinfo.com/en-api-reference/amazonNicheAPI/filterNiche)
- [Amazon Alexa API documentation](https://docs.pangolinfo.com/en-api-reference/amazonAlexaAPI/amazonAlexaAPI)

## License and trademarks

The bridge source code is licensed under the MIT License. Pangolinfo names, logos, product marks, and brand assets are not granted under that license; see [BRANDING.md](BRANDING.md).
