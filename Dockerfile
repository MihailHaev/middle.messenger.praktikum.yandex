FROM node:16.13.1
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE $PORT
CMD npm run server
