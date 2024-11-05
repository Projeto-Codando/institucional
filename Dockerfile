# Etapa 1: Construção da aplicação
FROM node:18 AS build

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

# Copia os arquivos de build para o diretório do Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia o arquivo de configuração default do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta que o Nginx estará usando
EXPOSE 80

# Comando para rodar o Nginxdocker 
CMD ["nginx", "-g", "daemon off;"]


