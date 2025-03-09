FROM node:16-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY my-app/package*.json ./my-app/
RUN cd my-app && npm install

# Copy the rest of the frontend code
COPY . .

# Build the React app
WORKDIR /app/my-app
RUN npm run build

# Production environment
FROM nginx:alpine
COPY --from=0 /app/my-app/build /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]