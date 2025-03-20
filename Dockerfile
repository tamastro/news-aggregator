# Use the latest LTS version of Node.js
FROM node:20.18.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "run", "preview"]