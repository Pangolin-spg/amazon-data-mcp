FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm ci

COPY src ./src
RUN npm run build && npm prune --omit=dev

FROM node:22-alpine AS runtime

LABEL org.opencontainers.image.title="Pangolinfo Amazon Data MCP" \
      org.opencontainers.image.description="Official stdio bridge to Pangolinfo Amazon Data MCP with 19 live commerce intelligence tools" \
      org.opencontainers.image.url="https://www.pangolinfo.com/amazon-data-mcp/" \
      org.opencontainers.image.source="https://github.com/Pangolin-spg/amazon-data-mcp" \
      org.opencontainers.image.licenses="MIT"

ENV NODE_ENV=production
WORKDIR /app

COPY --chown=node:node --from=build /app/package.json ./package.json
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist

USER node

ENTRYPOINT ["node", "dist/index.js"]
