# Development stage
FROM node:lts-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies explicitly
RUN npm install 

# Copy source code
COPY ./src ./src
COPY ./tsconfig*.json ./
COPY ./.env ./.env
COPY ./public ./public
COPY ./index.html ./index.html
COPY ./vite.config.ts ./vite.config.ts

# Expose the port the app runs on
EXPOSE 5173

# Command to run the application with nodemon for hot-reloading
CMD ["npm", "run", "dev"] 