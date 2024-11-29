#!/bin/bash

# Caminhos dos certificados
SSL_DIR="/etc/letsencrypt/live/codandoapp.me"
SSL_CERT="${SSL_DIR}/fullchain.pem"
SSL_KEY="${SSL_DIR}/privkey.pem"

# Certificado já existe?
if [ ! -f "$SSL_CERT" ]; then
  echo "Obtendo certificado SSL com Certbot..."
  certbot certonly --standalone --agree-tos --email matheus.lourenco@sptech.school -d codandoapp.me -d www.codandoapp.me

  if [ $? -ne 0 ]; then
    echo "Falha ao obter o certificado SSL. Abortando..."
    exit 1
  fi
  echo "Certificado SSL obtido com sucesso!"
else
  echo "Certificado SSL já existe. Pulando geração."
fi

# Substitui a configuração HTTP por HTTPS
echo "Habilitando HTTPS no Nginx..."
cat <<EOL > /etc/nginx/conf.d/default.conf
server {
    listen 443 ssl;
    server_name codandoapp.me www.codandoapp.me;

    ssl_certificate $SSL_CERT;
    ssl_certificate_key $SSL_KEY;

    location / {
        root /usr/share/nginx/html;
        index index.html;
        try_files \$uri /index.html;
    }

    location /api/ {
        proxy_pass http://backend_servers;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }
}
EOL

# Inicia o Nginx
echo "Iniciando o Nginx..."
nginx -g "daemon off;"
