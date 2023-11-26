#! /bin/ash

cp -r /usr/src/cache/node_modules/. /usr/src/app/node_modules/
mkdir -p /usr/src/app/node_modules/.cache && chmod 766 /usr/src/app/node_modules/.cache
npm test