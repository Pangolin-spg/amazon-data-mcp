import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import test from 'node:test';

test('prints help without requiring an API key', () => {
  const output = execFileSync(process.execPath, ['dist/index.js', '--help'], {
    encoding: 'utf8',
    env: {},
  });

  assert.match(output, /Pangolinfo Amazon Data MCP/);
  assert.match(output, /PANGOLINFO_API_KEY/);
  assert.match(output, /https:\/\/mcp\.pangolinfo\.com\/mcp/);
});

