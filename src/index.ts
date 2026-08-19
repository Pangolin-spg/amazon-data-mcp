#!/usr/bin/env node

import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

const VERSION = '0.1.1';
const DEFAULT_ENDPOINT = 'https://mcp.pangolinfo.com/mcp';

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  process.stdout.write(`Pangolinfo Amazon Data MCP ${VERSION}\n\n`);
  process.stdout.write('An stdio bridge to the hosted Pangolinfo Amazon Data MCP.\n\n');
  process.stdout.write('Required environment variable:\n');
  process.stdout.write('  PANGOLINFO_API_KEY   Your Pangolinfo API key\n\n');
  process.stdout.write('Optional environment variable:\n');
  process.stdout.write(`  PANGOLINFO_MCP_URL   Remote endpoint (default: ${DEFAULT_ENDPOINT})\n`);
  process.exit(0);
}

if (process.argv.includes('--version') || process.argv.includes('-v')) {
  process.stdout.write(`${VERSION}\n`);
  process.exit(0);
}

const apiKey = process.env.PANGOLINFO_API_KEY?.trim();
if (!apiKey) {
  process.stderr.write(
    'PANGOLINFO_API_KEY is required. Get a key at https://www.pangolinfo.com/amazon-data-mcp/\n',
  );
  process.exit(1);
}

const endpoint = process.env.PANGOLINFO_MCP_URL?.trim() || DEFAULT_ENDPOINT;
let endpointUrl: URL;

try {
  endpointUrl = new URL(endpoint);
} catch {
  process.stderr.write('PANGOLINFO_MCP_URL must be a valid URL.\n');
  process.exit(1);
}

if (endpointUrl.protocol !== 'https:') {
  process.stderr.write('PANGOLINFO_MCP_URL must use HTTPS.\n');
  process.exit(1);
}

const remoteClient = new Client(
  { name: 'pangolinfo-amazon-data-mcp-bridge', version: VERSION },
  { capabilities: {} },
);

const remoteTransport = new StreamableHTTPClientTransport(endpointUrl, {
  requestInit: {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  },
});

const localServer = new Server(
  { name: 'pangolinfo-amazon-data-mcp', version: VERSION },
  { capabilities: { tools: {} } },
);

localServer.setRequestHandler(ListToolsRequestSchema, async (request) => {
  return remoteClient.listTools(request.params);
});

localServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  return remoteClient.callTool({
    name: request.params.name,
    arguments: request.params.arguments,
  });
});

let closing = false;
async function shutdown(): Promise<void> {
  if (closing) return;
  closing = true;
  await Promise.allSettled([localServer.close(), remoteClient.close()]);
}

process.on('SIGINT', () => void shutdown().finally(() => process.exit(0)));
process.on('SIGTERM', () => void shutdown().finally(() => process.exit(0)));

try {
  await remoteClient.connect(remoteTransport);
  await localServer.connect(new StdioServerTransport());
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  process.stderr.write(`Unable to start Pangolinfo Amazon Data MCP: ${message}\n`);
  await shutdown();
  process.exit(1);
}
