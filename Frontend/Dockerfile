FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier package.json et package-lock.json et installer les dépendances
COPY Frontend/package*.json ./
RUN npm install

# Copier le contenu complet du dossier Frontend
COPY Frontend ./

# Exposer le port d’écoute (ici 3000 par défaut)
EXPOSE 3000

# Lancer l’application (la commande peut varier selon votre configuration)
CMD ["npm", "start"]


## Use official Node.js LTS image
#FROM node:18-alpine
#
## Set work directory
#WORKDIR /usr/src/app
#
## Copy dependency definitions
#COPY Frontend/package.json Frontend/package-lock.json ./
#
## Install dependencies
#RUN npm ci
#
## Copy source files
#COPY Frontend/src ./src
#COPY Frontend/public ./public
#
## Build the React app
#RUN npm run build
#
## Serve the build using a simple static server
#RUN npm install -g serve
#
## Expose the port
#EXPOSE 3000
#
## Start the server
#CMD ["serve", "-s", "build", "-l", "3000"]