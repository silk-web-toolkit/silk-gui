#!/bin/bash
ulimit -S -n 4096

rm -rf build

if [ $1 = "update" ]; then
  rm -rf node_modules
  npm install npm@latest
  npm install gulp
  npm install nw-builder
  npm install jsedn
  cp -rf node_modules_hack/type node_modules/jsedn/node_modules/
fi

silk spin

cp -rf node_modules site/
rm -rf site/node_modules/gulp
rm -rf site/node_modules/nw-builder
rm -rf site/node_modules/.bin/gulp
rm -rf site/node_modules/.bin/node-webkit-builder
cp package.json site/

gulp nw
