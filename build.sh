#!/bin/sh
ulimit -S -n 4096
sudo npm update
sudo npm install gulp
sudo npm install node-webkit-builder
silk spin
cp -rf node_modules site/
rm -rf site/node_modules/gulp
rm -rf site/node_modules/node-webkit-builder
rm -rf site/node_modules/.bin/gulp
rm -rf site/node_modules/.bin/node-webkit-builder
cp package.json site/
gulp nw
