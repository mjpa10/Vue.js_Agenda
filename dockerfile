# Usa uma imagem base do Node.js para desenvolvimento
FROM node:16-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todos os arquivos do projeto para o contêiner
COPY . .

# Expõe a porta padrão de desenvolvimento do Vue (8080)
EXPOSE 8080

# Comando para iniciar o servidor de desenvolvimento com hot-reload
CMD ["npm", "run", "serve"]
