#!/bin/sh

silk 
cp package.json site/ 
cd site/ 
zip ../silk-gui.nw * -r
cd ../ 
