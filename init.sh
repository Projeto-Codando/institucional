#!/bin/bash

# Caminhos dos certificados
SSL_DIR="/etc/letsencrypt/live/codando.hopto.org"
SSL_CERT="${SSL_DIR}/fullchain.pem"
SSL_KEY="${SSL_DIR}/privkey.pem"

# Realiza a obtenção do certificado SSL com o Certbot
echo "Obtendo certificado SSL com Certbot..."
certbot certonly --standalone --agree-tos --email seu-email@dominio.com -d codando.hopto.org

# Verifica se o certificado foi obtido com sucesso
if [ ! -f "$SSL_CERT" ]; then
  echo "Falha ao obter o certificado SSL. Abortando..."
  exit 1
fi

echo "Certificado SSL obtido com sucesso!"

# Inicia o Nginx
echo "Iniciando o Nginx..."
nginx -g "daemon off;"
