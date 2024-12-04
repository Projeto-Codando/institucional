#!/bin/sh


SSL_CERT="/etc/letsencrypt/live/codando.hopto.org/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/codando.hopto.org/privkey.pem"

if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
    echo "Obtendo certificados SSL com Certbot..."
    certbot certonly --standalone --agree-tos --email matheusismael013@gmail.com \
        -d codando.hopto.org -d codandoapp.me -d www.codandoapp.me
else
    echo "Certificados SSL já existem. Pulando geração."
fi

echo "Iniciando o Nginx..."
nginx -g "daemon off;"
