#!/bin/sh
silk 
cp -rf node_modules site/
cp package.json site/ 
cd site/ 
zip ../silk-gui.nw * -r
cd ../ 
