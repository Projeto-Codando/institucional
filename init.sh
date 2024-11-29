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
upstream backend_servers {
    server 10.0.0.164:8080 max_fails=3 fail_timeout=10s;  # para api-codando1
    server 10.0.0.164:8082 max_fails=3 fail_timeout=10s;  # para api-codando2
}

server {
  listen 80;
  server_name codandoapp.me www.codandoapp.me;  # Atualize o domínio aqui

  # Redireciona todo tráfego HTTP para HTTPS
  return 301 https://$host$request_uri;
}

# Servidor HTTPS
server {
  listen 443 ssl;
  server_name codandoapp.me www.codandoapp.me;  # Atualize o domínio aqui

  # Configuração dos certificados gerados pelo Certbot
  ssl_certificate /etc/letsencrypt/live/codandoapp.me/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/codandoapp.me/privkey.pem;

  # Configuração para o frontend (React)
  location / {
    root /usr/share/nginx/html;
    index index.html index.htm;
    try_files $uri /index.html;
  }

  # Configuração para o balanceamento de carga do backend Spring Boot
  location /api/ {
    proxy_pass http://backend_servers;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Authorization $http_authorization;   # Encaminha o cabeçalho Authorization
  }

  # Configuração para acessar o Swagger UI do backend
  location /swagger-ui/ {
    rewrite ^/swagger-ui/(.*)$ /swagger-ui/index.html break;
    proxy_pass http://backend_servers;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
EOL

# Inicia o Nginx
echo "Iniciando o Nginx..."
nginx -g "daemon off;"
