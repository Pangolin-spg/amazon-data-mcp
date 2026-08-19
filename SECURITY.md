# Security policy

Please report suspected vulnerabilities privately through Pangolinfo's official support channel rather than opening a public issue. Include the affected version, reproduction steps, and potential impact.

Never include API keys, customer data, or full MCP responses in a public report.

The bridge reads `PANGOLINFO_API_KEY` from the process environment, sends it only to the configured HTTPS MCP endpoint as a Bearer credential, and does not persist or log it.

