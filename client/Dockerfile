# Stage 1: Build the frontend
FROM node:latest AS frontend
# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the frontend application
RUN npm run build

# Stage 2: Serve the built application using Nginx
FROM nginx:1.25.3-alpine-slim

# Copy the built frontend assets from the previous stage to the Nginx HTML directory
COPY --from=frontend /app/client/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]