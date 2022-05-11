#!/bin/bash

#
# Update
#
sudo apt update


echo "Enter Node Version (eg) 14:"
read nodeVersion

cd ~
curl -sL https://deb.nodesource.com/setup_$nodeVersion.x -o /tmp/nodesource_setup.sh

sudo bash /tmp/nodesource_setup.sh

sudo apt install nodejs

node -v

npm -v

sudo npm -g install yarn

yarn global add concurrently pm2