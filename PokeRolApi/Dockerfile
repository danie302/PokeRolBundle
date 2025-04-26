# Development stage
FROM node:lts-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies explicitly
RUN npm install 

# Copy source code
COPY ./src ./src
COPY ./tsconfig.json ./tsconfig.json
COPY ./.env ./.env

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application with nodemon for hot-reloading
CMD ["npm", "run", "dev"] 