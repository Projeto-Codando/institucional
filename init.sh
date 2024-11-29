#!/bin/sh

# Caminhos dos certificados
SSL_DIR="/etc/nginx/ssl"
SSL_CERT="${SSL_DIR}/selfsigned.crt"
SSL_KEY="${SSL_DIR}/selfsigned.key"

# Gera novos certificados SSL
echo "Gerando novos certificados SSL..."
openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout "$SSL_KEY" \
    -out "$SSL_CERT" \
    -subj "/C=BR/ST=SP/L=SaoPaulo/O=MinhaEmpresa/OU=TI/CN=localhost"

# Inicia o Nginx
#------
echo "Iniciando o Nginx..."
nginx -g "daemon off;"