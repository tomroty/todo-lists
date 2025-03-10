FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template
RUN mkdir -p /etc/nginx/conf.d

# Utiliser un script de démarrage pour remplacer les variables d'environnement
CMD ["/bin/sh", "-c", "envsubst '$$FRONTEND_URL $$BACKEND_URL' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]

EXPOSE 80