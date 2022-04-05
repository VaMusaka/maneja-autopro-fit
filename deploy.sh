#!/bin/bash

echo "==== GETTING LATEST CHANGES ===="
git pull

echo "==== INSTALLING CLIENT DEPS ===="
cd ./client
yarn install

echo "==== BUILDING CLIENT ===="
yarn build

echo "==== INSTALLING SERVER DEPS ===="
cd ../server

echo "==== DOWNLOADING CLIENT TO DEV ===="
rm -rfv ./client/build
mv -fv ../client/build client/

echo "==== RESTARTING SERVER ===="
pm2 restart 0

echo "==== DEPLOYMENT COMPLETE ===="
pm2 status

