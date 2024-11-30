#!/bin/sh

# Caminhos dos certificados
SSL_DIR="/etc/nginx/ssl"
SSL_CERT="${SSL_DIR}/selfsigned.crt"
SSL_KEY="${SSL_DIR}/selfsigned.key"

# Instalar OpenSSL, caso não esteja instalado (para depuração)
command -v openssl >/dev/null 2>&1 || apk add --no-cache openssl

# Gera novos certificados SSL
echo "Gerando novos certificados SSL..."
mkdir -p "$SSL_DIR"
openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout "$SSL_KEY" \
    -out "$SSL_CERT" \
    -subj "/C=BR/ST=SP/L=SaoPaulo/O=MinhaEmpresa/OU=TI/CN=localhost"

# Testa se os certificados foram gerados
if [ ! -f "$SSL_CERT" ] || [ ! -f "$SSL_KEY" ]; then
  echo "Erro ao gerar certificados SSL. Abortando..."
  exit 1
fi

# Inicia o Nginx
echo "Iniciando o Nginx..."
nginx -g "daemon off;"
