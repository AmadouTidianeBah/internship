# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Native deps for bcrypt
RUN apk add --no-cache python3 make g++
# Pin pnpm (matches the lockfile v9.0) so corepack ne tire pas une version incompatible
RUN corepack enable && corepack prepare pnpm@10.32.1 --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# --- Production stage ---
FROM node:20-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production

# Reuse the already-built node_modules (bcrypt compiled on the same alpine base)
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
