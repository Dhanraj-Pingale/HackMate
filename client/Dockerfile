# Use a specific Node version as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy only the package files first (for caching dependencies)
COPY package*.json ./

# Install dependencies (this will leverage Docker cache for faster builds)
RUN npm install --silent
 
# Copy the rest of the application code into the container
COPY . .

# Expose port 5173 for the React development server
EXPOSE 5173

# Run the development server when the container starts
CMD ["npm", "run", "dev"]
