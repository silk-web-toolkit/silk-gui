#!/bin/sh
#lein clean
#lein deps 
lein cljsbuild once
cd resources/public
zip ../../silk-gui.nw * -r
cd ../../ 