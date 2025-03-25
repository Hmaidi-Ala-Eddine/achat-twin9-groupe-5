# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies with --legacy-peer-deps to prevent conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Angular project (fixing the build flag)
RUN npm run build --configuration=production

# Install http-server globally to serve the app
RUN npm install -g http-server

# Expose port 8080 for the app to be accessible
EXPOSE 8080

# Command to run the server
CMD ["http-server", "dist/achat-frontend", "-p", "8080"]
