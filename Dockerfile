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

# Gerar o certificado autoassinado
RUN openssl req -x509 -nodes -days 365 \
    -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/selfsigned.key \
    -out /etc/nginx/ssl/selfsigned.crt \
    -subj "/C=BR/ST=SP/L=SaoPaulo/O=MinhaEmpresa/OU=TI/CN=localhost"

# Copia os arquivos de build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor as portas 80 e 443
EXPOSE 80 443

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]