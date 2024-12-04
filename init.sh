#!/bin/sh

SSL_CERT="/etc/letsencrypt/live/codandoapp.me/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/codandoapp.me/privkey.pem"

if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
    echo "Obtendo certificados SSL com Certbot..."
    certbot certonly --standalone \
        --server https://api.buypass.com/acme/directory \
        -d codandoapp.me -d www.codandoapp.me \
        --agree-tos --email matheus.lourenco@sptech.school
fi

if [ -f "$SSL_CERT" ] && [ -f "$SSL_KEY" ]; then
    echo "Certificados SSL encontrados. Iniciando o Nginx..."
    nginx -g "daemon off;"
else
    echo "Erro: Certificados SSL não encontrados. Abortando..."
    exit 1
fi
