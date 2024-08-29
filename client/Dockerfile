# Build the frontend
FROM node:18-alpine as frontend-build

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install application dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Third stage: Setup Nginx to serve the frontend and backend
FROM nginx:1.25.3

# Copy the build files from the frontend build stage to the Nginx directory
COPY --from=frontend-build /app/client/build /usr/share/nginx/html

# Expose the port where Nginx will run
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]