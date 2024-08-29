#  Nginx to serve the frontend and backend
FROM node:18-alpine AS build-frontend

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY package-lock.json ./

# Install application dependencies
RUN npm install

# Copy the source code to the working directory
COPY . .

# Build the React application
RUN npm run build

# Expose the port where Nginx will run
EXPOSE 80

# Start
CMD ["npm", "Start"]

FROM nginx:1.25.3


