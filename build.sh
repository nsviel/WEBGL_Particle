#!/bin/bash
#---------------------------

#Requiere npm and uglify
#-------------
#npm install uglify-js -g
#-------------

echo -e "[\e[92m#\e[0m] Build JavaScript program..."

#Go to src folder
cd src

#Minify of all JS scripts
cat \
specific/utility.js \
specific/struct.js \
specific/gui.js \
specific/entropy.js \
specific/anarpoint.js \
\
webgl/main.js \
webgl/webgl.js \
webgl/shader.js \
webgl/camera.js \
\
scene/point.js \
scene/line.js \
scene/scene.js \
scene/config.js \
\
| uglifyjs -o build/particle.js

#Run program in browser
cd ..
firefox index.html

#---------------------------
