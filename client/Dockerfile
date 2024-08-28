# Use Node.js to build the application
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use Nginx to serve the application
FROM nginx:1.25.3

# Copy the build files from the previous stage to the Nginx directory
COPY --from=build /app/client/build /usr/share/nginx/html

# Expose the port where Nginx will run
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
