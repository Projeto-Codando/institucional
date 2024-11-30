#!/bin/sh

# Caminho padrão para os certificados Let's Encrypt
SSL_CERT="/etc/letsencrypt/live/codando.hopto.org/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/codando.hopto.org/privkey.pem"

# Obtém certificados SSL válidos com Certbot, se não existirem
if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
    echo "Obtendo certificados SSL com Certbot..."
    certbot certonly --standalone --agree-tos --email matheus.lourenco@sptech.school \
        -d codando.hopto.org -d www.codando.hopto.org
else
    echo "Certificados SSL já existem. Pulando geração."
fi

# Inicia o Nginx
echo "Iniciando o Nginx..."
nginx -g "daemon off;"
