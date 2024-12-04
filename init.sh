#!/bin/sh


SSL_CERT="/etc/letsencrypt/live/codando.hopto.org/fullchain.pem"
SSL_KEY="/etc/letsencrypt/live/codando.hopto.org/privkey.pem"

if [ ! -f "/etc/letsencrypt/live/codando.hopto.org/fullchain.pem" ] || [ ! -f "/etc/letsencrypt/live/codando.hopto.org/privkey.pem" ]; then
    echo "Certificados SSL ausentes ou inválidos. Aguarde até que a emissão esteja liberada novamente."
    exit 1
else
    echo "Usando certificados SSL existentes."
fi


echo "Iniciando o Nginx..."
nginx -g "daemon off;"
