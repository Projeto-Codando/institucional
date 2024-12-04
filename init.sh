#!/bin/sh


SSL_CERT="/etc/letsencrypt/live/codando.hopto.org/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/codando.hopto.org/privkey.pem"

if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
    echo "Obtendo certificados SSL com Certbot..."
    sudo certbot certonly --standalone \
  --server https://api.buypass.com/acme/directory \
  -d codandoapp.me -d www.codandoapp.me \
  --agree-tos --email matheus.lourenco@sptech.school
else
    echo "Certificados SSL já existem. Pulando geração."
fi

echo "Iniciando o Nginx..."
nginx -g "daemon off;"
