# Marketplace distribution metadata

This directory contains public, non-secret configuration metadata used to publish the official Pangolinfo Amazon Data MCP to external marketplaces.

## Smithery

`smithery-config-schema.json` maps Smithery's non-reserved `pangolinfo-authorization` input header to the upstream `Authorization` header.

Because Smithery forwards the string without transforming it, users must enter the complete value:

```text
Bearer <PANGOLINFO_API_KEY>
```

The file contains no API key. A short-lived test key may be entered interactively during Smithery's authenticated server scan and must never be committed.

Suggested publish command after Smithery authentication:

```bash
smithery mcp publish "https://mcp.pangolinfo.com/mcp" \
  -n pangolinfo/amazon-data \
  --config-schema "$(jq -c . distribution/smithery-config-schema.json)"
```

If the namespace differs from `pangolinfo`, update only the `-n` value. Keep the product page at https://www.pangolinfo.com/amazon-data-mcp/.
