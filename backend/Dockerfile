# --- Frontend Build Stage ---
FROM node:18 AS frontend-builder
WORKDIR /app
COPY ./frontend/my-app/package*.json ./
RUN npm install
COPY ./frontend/my-app /app
RUN npm run build

# --- Backend Build Stage ---
FROM python:3.9 AS backend-builder
WORKDIR /usr/src/app
COPY ./backend/requirements.txt ./
RUN pip install --no-cache-dir --upgrade -r requirements.txt
# Install openssl
RUN apt-get update && apt-get install -y --no-install-recommends openssl
COPY ./backend ./

# --- Final Stage (Nginx) ---
FROM nginx:stable-alpine AS final

# Copy Nginx configuration
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend files
COPY --from=frontend-builder /app/build /usr/share/nginx/html

# Copy backend files
COPY --from=backend-builder /usr/src/app /usr/src/app

EXPOSE 80

# Use uvicorn for production
CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "3001"]