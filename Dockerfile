# Use the official Node.js image as the base
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files

COPY  package.json .
# Install dependencies
RUN npm install

# Copy the server source code
COPY . .


# Set the working directory to the server folder
WORKDIR /app/server

# Expose the port defined in the config
EXPOSE 8000

# Start the Node.js application
CMD ["node", "server.js"]
