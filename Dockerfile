# Etapa 1: Build do frontend
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Servir o frontend com Nginx e obter certificado
FROM nginx:alpine

# Instala o Certbot e dependências
RUN apk add --no-cache certbot bash openssl

# Copia os arquivos do frontend
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Adiciona o script init.sh
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Expõe as portas 80 e 443
EXPOSE 80 443

# Inicia o script de inicialização
CMD ["/usr/local/bin/init.sh"]
