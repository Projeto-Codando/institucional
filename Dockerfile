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

# Etapa 2: Servir a aplicação com o Nginx e configurar SSL
FROM nginx:alpine

# Instala OpenSSL para gerar certificados autoassinados
RUN apk add --no-cache openssl

# Diretório para certificados SSL
RUN mkdir -p /etc/nginx/ssl

# Copia os arquivos de build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Adiciona o script de inicialização
COPY init.sh /usr/local/bin/init.sh
RUN chmod +x /usr/local/bin/init.sh

# Expor as portas 80 e 443
EXPOSE 80 443

# Executa o script init.sh no início
CMD ["/usr/local/bin/init.sh"]
