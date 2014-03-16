#!/bin/sh
#lein clean
#lein deps 
rm -f resources/public/js/main.js
rm -rf target
lein cljsbuild once
cd resources/public
zip ../../silk-gui.nw * -r
cd ../../ 
