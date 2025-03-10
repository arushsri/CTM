# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 3000 for React app
EXPOSE 3000

# Start React app
CMD ["npm", "run", "dev"]