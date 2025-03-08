# --- Frontend Build Stage ---
    FROM node:18 AS frontend-builder

    WORKDIR /app
    
    COPY ./frontend/my-app/package*.json ./
    RUN npm install
    COPY ./frontend/my-app /app
    RUN npm run build
    
    # --- Backend Build Stage ---
    FROM python:3.9 AS backend-builder
    WORKDIR /app/backend
    
    COPY ./backend/requirements.txt /app/backend/
    RUN pip install --no-cache-dir -r /app/backend/requirements.txt
    RUN apt-get update && apt-get install -y --no-install-recommends openssl
    
    COPY ./backend /app/backend
    
    # --- Nginx Stage ---
    FROM nginx:stable-alpine AS final
    
    # Copy Nginx configuration
    COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy built frontend files
    COPY --from=frontend-builder /app/build /usr/share/nginx/html
    
    # Copy necessary files from the backend stage
    COPY --from=backend-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
    COPY --from=backend-builder /app/backend /app/backend
    
    # Overriding any default entrypoint
    ENTRYPOINT []
    
    EXPOSE 80
    
    CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "3001"]