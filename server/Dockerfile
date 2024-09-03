# Use Node.js version 18 as the base image
FROM node:20-alpine

<<<<<<< HEAD
# Set the working directory inside the container
WORKDIR /app/server

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
=======
# Copy package.json to the working directory
COPY package.json .
>>>>>>> main

# Install application dependencies
RUN npm install

# Install Babel globally
RUN npm install -g @babel/core @babel/cli

# Copy the source code to the working directory
COPY . .

# Run build if necessary (e.g., TypeScript compilation or other build steps)
RUN npm run build-api

# Run the application
CMD ["npm", "run", "build"]
