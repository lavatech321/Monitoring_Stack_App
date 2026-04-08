FROM node:22
WORKDIR /app

# Copy package files and install dependencies
COPY ./weather_app_frontend/package*.json ./
RUN npm install  # Install dependencies

# Copy the rest of the application code
COPY ./weather_app_frontend/ ./

# Verify installed packages and directory content
RUN ls -la /app

# Build the React app for production
RUN npm run build

# Expose the port and start the app
EXPOSE 3000
CMD ["npm", "start"]

