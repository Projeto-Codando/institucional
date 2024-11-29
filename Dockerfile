# Etapa 1: Construção da aplicação
FROM node:18-alpine AS build

# Diretório de trabalho na imagem
WORKDIR /app

# Copia o package.json e o package-lock.json para a imagem
COPY package*.json ./ 

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código da aplicação para a imagem
COPY . .

# Compila a aplicação React para produção
RUN npm run build

# Etapa 2: Servir a aplicação com o Nginx
FROM nginx:alpine

# Instala o Certbot e dependências
RUN apk add --no-cache certbot bash

# Copia os arquivos de build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor as portas 80 e 443
EXPOSE 80 443

# Script para obter o certificado e iniciar o Nginx
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Comando padrão para iniciar o script de inicialização
CMD ["/usr/local/bin/init.sh"]
