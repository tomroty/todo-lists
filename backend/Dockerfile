# --- Frontend Build Stage ---
FROM node:18 AS frontend-builder
# Use a Node.js base image for building the frontend

# Set working directory *inside* the container
WORKDIR /app/frontend

# Copy package.json and package-lock.json (important for caching)
COPY frontend/my-app/package*.json ./

# Install dependencies *inside* the container
RUN npm install

# Copy the rest of the frontend app's source code
COPY frontend/my-app/ ./

# Build the React app
RUN npm run build

# --- Backend Build Stage ---
FROM python:3.9 AS backend-builder
# Use a Python base image

WORKDIR /usr/src/app

# Copy requirements.txt *from the root of your repo*
COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
RUN apt-get update && apt-get install -y --no-install-recommends openssl

COPY backend/ ./

# --- Final Stage (Nginx) ---
FROM nginx:stable-alpine AS final

# Copy built frontend files
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Copy backend
COPY --from=backend-builder /usr/src/app /usr/src/app

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]