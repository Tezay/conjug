#FROM ubuntu:latest
#LABEL authors="soyer"
#
#ENTRYPOINT ["top", "-b"]

# Build stage
FROM node:20-alpine AS build

WORKDIR /conjug

COPY package.json package-lock.json ./
RUN npm install

COPY ./src ./src
COPY ./public ./public

RUN npm run build

# Production stage
FROM nginx:alpine

# Copier le build React dans le dossier nginx pour servir les fichiers statiques
COPY --from=build /conjug/build /usr/share/nginx/html

# Expose le port 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]