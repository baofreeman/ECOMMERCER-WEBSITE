# Use Node.js version 18 as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./app/server/package.json
COPY package-lock.json /app/server/package-lock.json

# Install application dependencies
RUN npm install

# Install Babel globally
RUN npm install -g @babel/core @babel/cli

# Copy the source code to the working directory
COPY . ./app/server

# Run build if necessary (e.g., TypeScript compilation or other build steps)
RUN npm run build-api

# Run the application
CMD ["npm", "run", "build"]
