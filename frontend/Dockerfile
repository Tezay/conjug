# ─── Stage 1: Production builder ─────────────────────────────────────────────
FROM node:20 AS builder

WORKDIR /app

# Install dependencies & build static assets
COPY package*.json ./
RUN npm ci 

COPY . .
RUN npm run build

# ─── Stage 2: Serve with Nginx ───────────────────────────────────────────────
FROM nginx:alpine AS prod

# Remove default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets into Nginx webroot
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]


# ─── Stage 3: Development ────────────────────────────────────────────────────
FROM node:20 AS dev

WORKDIR /app

# Install dependencies for dev
COPY package*.json ./
RUN npm install

# Copy source for live reload
COPY . .

EXPOSE 5173

# Run your dev server (Vite, CRA, etc.)
CMD ["npm", "run", "dev"]