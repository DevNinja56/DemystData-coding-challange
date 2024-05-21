# Use the official Node.js image from the Docker Hub
FROM node:18-alpine

# Create and set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Specify the command to run the application
CMD ["node", "index.mjs"]
