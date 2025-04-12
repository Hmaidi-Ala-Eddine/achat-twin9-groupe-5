# Step 1: Use NGINX to serve the pre-built Angular app
FROM nginx:alpine

# Copy the pre-built Angular app from the local dist folder to NGINX's default folder
COPY ./dist/achat-frontend-4twin9-groupe-5 /usr/share/nginx/html

# Expose port 80 (default HTTP port for NGINX)
EXPOSE 80

# Run NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]







