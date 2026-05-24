# Build & Run stage
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files relative to repo root context
COPY backend/package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy source code files relative to repo root context
COPY backend/src ./src

# Expose server port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production
ENV PORT=5000

# Start server
CMD ["node", "src/index.js"]
