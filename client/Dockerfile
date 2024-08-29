#  Nginx to serve the frontend and backend
FROM node:18-alpine AS build-frontend
FROM nginx:1.25.3

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./app/client
COPY package-lock.json /app/client

# Install application dependencies
RUN npm install

# Copy the source code to the working directory
COPY . ./app/client

# Build the React application
RUN npm run build

# Expose the port where Nginx will run
EXPOSE 80

# Start
CMD ["npm", "Start"]


