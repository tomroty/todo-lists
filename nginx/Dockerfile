FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template
RUN mkdir -p /etc/nginx/conf.d

# Script de démarrage pour vérifier et ajouter le protocole aux URLs si nécessaire
CMD ["/bin/sh", "-c", "\
    # Vérifier et formater FRONTEND_URL \
    if [ -z \"$FRONTEND_URL\" ]; then \
        echo \"ERROR: FRONTEND_URL is not set\"; \
        exit 1; \
    fi; \
    if ! echo $FRONTEND_URL | grep -q '^https\\?:\\/\\/'; then \
        export FRONTEND_URL=\"https://$FRONTEND_URL\"; \
    fi; \
    \
    # Vérifier et formater BACKEND_URL \
    if [ -z \"$BACKEND_URL\" ]; then \
        echo \"ERROR: BACKEND_URL is not set\"; \
        exit 1; \
    fi; \
    if ! echo $BACKEND_URL | grep -q '^https\\?:\\/\\/'; then \
        export BACKEND_URL=\"https://$BACKEND_URL\"; \
    fi; \
    \
    # Appliquer les variables et démarrer nginx \
    envsubst '${FRONTEND_URL} ${BACKEND_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
    cat /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'"]

EXPOSE 80