# Étape 1 : Build de l'application Angular
FROM node:18 AS build-stage

WORKDIR /app
COPY . .

RUN npm install --legacy-peer-deps
RUN npm run build -- --configuration production

# Étape 2 : Serveur web nginx pour servir l'app
FROM nginx:alpine

COPY --from=build-stage /app/dist/achat-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
