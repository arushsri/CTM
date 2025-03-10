# # Use Node.js image
# FROM node:18

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package.json package-lock.json ./
# RUN npm install --force

# # Copy all frontend files
# COPY . .

# # Build the frontend
# RUN npm run build

# # Serve the frontend
# CMD ["npm", "run", "preview"]

# # Expose port 5173 (or 3000 if using CRA)
# EXPOSE 5173


# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --force

# Copy all frontend files
COPY . .

# Build the frontend
RUN npm run build

# Ensure the dist folder exists
RUN mkdir -p /app/dist

# Set the command to serve the frontend
CMD ["npm", "run", "preview"]

# Expose the Vite preview server port
EXPOSE 4173