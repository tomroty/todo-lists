# --- Frontend Build Stage ---
FROM node:18 AS frontend-builder
WORKDIR /app/frontend

# Copy frontend files
COPY frontend/my-app/package*.json ./
RUN npm install
COPY frontend/my-app/ ./
RUN npm run build

# --- Backend Build Stage ---
FROM python:3.9

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt
RUN apt-get update && apt-get install -y --no-install-recommends openssl

COPY backend/ ./

# --- Final Stage (Nginx) ---
FROM nginx:stable-alpine AS final

# Copy built frontend files
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html

# Copy backend
COPY --from=python-3.9 /usr/src/app /usr/src/app

# Copy Nginx configuration
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]