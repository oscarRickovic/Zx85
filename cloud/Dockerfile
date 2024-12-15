# Start with an Ubuntu base image
FROM ubuntu:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json first (if they exist)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your Node.js app runs on
EXPOSE 3000

# Command to run your application 
CMD ["/bin/bash"]

