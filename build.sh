#!/bin/bash
#---------------------------

#Requiere npm and uglify
#-------------
#npm install uglify-js -g
#-------------

echo -e "[\e[92m#\e[0m] Build JavaScript program..."

#Go to src folder
cd particle

#Minify of all JS scripts
cat \
specific/utility.js \
specific/struct.js \
specific/gui.js \
specific/entropy.js \
specific/anarpoint.js \
specific/gl-matrix-min.js \
specific/dat.gui.min.js \
\
webgl/main.js \
webgl/webgl.js \
webgl/shader.js \
webgl/camera.js \
\
scene/point.js \
scene/line.js \
scene/scene.js \
scene/mouse.js \
scene/config.js \
\
| uglifyjs -o build/particle.js

#Run program in browser
cd ..
firefox index.html

#---------------------------
