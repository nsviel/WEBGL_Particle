#!/bin/bash

#npm install uglify-js -g
cd src

#cat $(ls *.js) | uglifyjs -o particule.js

cat utility.js entropy.js anarchiste.js struct.js camera.js webgl.js shader.js point.js line.js scene.js ui.js main.js | uglifyjs -o build/particule.js


cd ..
firefox index.html
