#!/bin/bash

#npm install uglify-js -g
cd src

#cat $(ls *.js) | uglifyjs -o particule.js

cat utility.js struct.js shader.js point.js line.js scene.js gui.js main.js | uglifyjs -o particule.js


cd ..
firefox index.html 
