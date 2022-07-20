FROM node:16.13.1
WORKDIR /var/www
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
CMD npm run build && npm run server
