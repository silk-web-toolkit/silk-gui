#!/bin/sh
ulimit -S -n 4096

rm -rf build

if [ $1 = "update" ]; then
  sudo npm update
  sudo npm install gulp
  sudo npm install node-webkit-builder
fi

silk spin

cp -rf node_modules site/ 2>/dev/null
rm -rf site/node_modules/gulp 2>/dev/null
rm -rf site/node_modules/node-webkit-builder 2>/dev/null
rm -rf site/node_modules/.bin/gulp 2>/dev/null
rm -rf site/node_modules/.bin/node-webkit-builder 2>/dev/null
cp package.json site/ 2>/dev/null
gulp nw
