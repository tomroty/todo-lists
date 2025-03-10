FROM nginx:alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template
RUN mkdir -p /etc/nginx/conf.d
RUN apk add --no-cache curl


# Script de démarrage pour construire les URLs complètes pour Render.com
CMD ["/bin/sh", "-c", "\
    # Afficher les variables reçues pour le débogage \
    echo \"FRONTEND_URL reçue: $FRONTEND_URL\"; \
    echo \"BACKEND_URL reçue: $BACKEND_URL\"; \
    \
    # Vérifier que les variables sont définies \
    if [ -z \"$FRONTEND_URL\" ]; then \
        echo \"ERROR: FRONTEND_URL is not set\"; \
        exit 1; \
    fi; \
    \
    if [ -z \"$BACKEND_URL\" ]; then \
        echo \"ERROR: BACKEND_URL is not set\"; \
        exit 1; \
    fi; \
    \
    # Convertir les noms de service en URLs complètes de Render.com \
    if ! echo $FRONTEND_URL | grep -q '\\.|:\\/\\/'; then \
        export FRONTEND_URL=\"https://$FRONTEND_URL.onrender.com\"; \
    fi; \
    \
    if ! echo $BACKEND_URL | grep -q '\\.|:\\/\\/'; then \
        export BACKEND_URL=\"https://$BACKEND_URL.onrender.com\"; \
    fi; \
    \
    echo \"FRONTEND_URL finale: $FRONTEND_URL\"; \
    echo \"BACKEND_URL finale: $BACKEND_URL\"; \
    \
    curl -I ${FRONTEND_URL} || echo \"Frontend unreachable\"; \
    curl -I ${BACKEND_URL} || echo \"Backend unreachable\"; \
    \
    # Appliquer les variables et démarrer nginx \
    envsubst '${FRONTEND_URL} ${BACKEND_URL}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && \
    cat /etc/nginx/conf.d/default.conf && \
    nginx -g 'daemon off;'"]

EXPOSE 80