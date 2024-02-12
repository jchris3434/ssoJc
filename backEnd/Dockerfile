FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 12456

# CMD ["nodemon", "serverSso.ts"]
CMD ["node_modules/.bin/nodemon", "serverSso.ts"]
