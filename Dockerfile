FROM node:18-alpine3.18
MAINTAINER Jordan Denison <jordan@denisonweb.com>

RUN mkdir -p /usr/src/cache
WORKDIR /usr/src/cache

COPY package.json ./
COPY package-lock.json ./

RUN npm install -g npm@10.1.0 \
  && npm install \
  && mkdir -p /usr/src/app/node_modules/.cache \
  && cp /usr/src/cache/package.json /usr/src/app/package.json \
  && cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/ \
  && chmod 777 /usr/src/app/node_modules/.cache

WORKDIR /usr/src/app

CMD ["npm", "test"]