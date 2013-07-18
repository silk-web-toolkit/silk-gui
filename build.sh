#!/bin/sh
export SILK_COMPONENTS_PATH=$HOME/.silk/components
export SILK_DATA_PATH=$HOME/.silk/data
silk 
cp package.json site/ 
cd site/ 
zip ../silk-gui.nw * -r
cd ../ 
