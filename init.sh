#!/bin/sh

SSL_CERT="/etc/letsencrypt/live/codandoapp.me/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/codandoapp.me/privkey.pem"

if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
    echo "Obtendo certificados SSL com Certbot..."
    certbot certonly --standalone \
      -d codandoapp.me -d www.codandoapp.me \
      --agree-tos --email matheus.lourenco@sptech.school \
      --non-interactive
else
    echo "Certificados SSL já existem. Pulando geração."
fi

echo "Iniciando o Nginx..."
nginx -g "daemon off;"
