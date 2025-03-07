# --- Frontend Build Stage ---
FROM node:18 AS frontend-builder

WORKDIR /app

COPY ./frontend/my-app/package*.json ./
RUN npm install
COPY ./frontend/my-app /app
RUN npm run build

# --- Backend Build Stage ---
FROM python:3.9 AS backend-builder
WORKDIR /app/backend  # Still correct

# Correct paths relative to the REPO ROOT
COPY ./backend/requirements.txt /app/backend/
RUN pip install --no-cache-dir -r /app/backend/requirements.txt

# Correct path relative to the REPO ROOT
COPY ./backend /app/backend

# --- Nginx Stage ---
FROM nginx:stable-alpine AS final

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend-builder /app/build /usr/share/nginx/html
COPY --from=backend-builder /app/backend /app/backend

EXPOSE 80

CMD ["uvicorn", "src.server:app","--host", "0.0.0.0", "--port", "3001"]