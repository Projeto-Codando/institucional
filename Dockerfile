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

# Etapa 2: Servir a aplicação com o Nginx e Certbot
FROM nginx:alpine

# Instalar Certbot e dependências necessárias
RUN apk add --no-cache certbot bash curl

# Diretório para certificados SSL
RUN mkdir -p /etc/letsencrypt/live/codando.hopto.org

# Copia os arquivos de build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia o script de inicialização que gerencia o SSL
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Expor as portas 80 e 443
EXPOSE 80 443

# Executa o script de inicialização
CMD ["/usr/local/bin/init.sh"]