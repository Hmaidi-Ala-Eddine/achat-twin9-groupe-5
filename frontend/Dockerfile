# Utiliser une image Nginx comme base
FROM nginx:alpine

# Copier les fichiers de distribution Angular dans le dossier de Nginx
COPY dist/achat-frontend /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
