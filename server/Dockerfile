# Build the backend
FROM node:18-alpine as backend-build

# Set the working directory inside the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY server/package*.json ./

# Install application dependencies
RUN npm install

# Install Babel globally
RUN npm install -g @babel/core @babel/cli

# Copy the source code to the working directory
COPY server/ .

# Run build if necessary (e.g., TypeScript compilation or other build steps)
RUN npm run build-api

# Second stage: Build the frontend
FROM node:18-alpine as frontend-build

# Set the working directory inside the container
WORKDIR /app/client

# Copy package.json and package-lock.json to the working directory
COPY client/package*.json ./

# Install application dependencies
RUN npm install

# Copy the source code to the working directory
COPY client/ .

# Build the React application
RUN npm run build