FROM node:20.9-alpine3.18
MAINTAINER Jordan Denison <jordan@denisonweb.com>

RUN mkdir -p /usr/src/cache && mkdir /usr/src/app
WORKDIR /usr/src/cache

COPY package.json ./
COPY package-lock.json ./

RUN npm install --location=global npm@10.2.4 && npm install

WORKDIR /usr/src/app

CMD ["/usr/src/app/entrypoint.sh"]