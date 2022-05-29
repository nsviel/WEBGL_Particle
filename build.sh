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
specific/ui.js \
specific/entropy.js \
specific/anarpoint.js \
\
webgl/main.js \
webgl/webgl.js \
webgl/shader.js \
webgl/camera.js \
\
point.js \
line.js \
scene.js \
\
| uglifyjs -o build/particule.js

#Run program in browser
cd ..
firefox index.html

#---------------------------
