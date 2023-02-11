#!/bin/bash
#---------------------------

#Requiere npm and uglify
#-------------
#npm install uglify-js -g
#-------------

echo -e "[\e[92m#\e[0m] Minify JavaScript files..."

# Selected desired configuration
echo -e "[\e[92m#\e[0m] List of available configurations:"
echo ----------------------
config_name=("default" "config_1" "config_2" "config3")
config_array=("config_default.js" "config_1.js" "config_2.js" "config_3.js")
cpt=0
for str in ${config_name[@]};
do
        printf "\e[93m%d\e[0m. $str\n" $cpt
        cpt=$((cpt+1))
done
echo ----------------------

# Get selected device
echo -ne "[\e[92m#\e[0m] Configuration number [default: \e[92m0\e[0m]: "
read config_nb
if [ -z "${config_nb}" ]; then conf_selected="config_default.js";
else
    cpt=0
    for str in ${config_array[@]};
    do
            if (( $cpt == $config_nb )); then conf_selected=$str; break; fi
            cpt=$((cpt+1))
    done;
fi


#Minify of all JS scripts
cat \
src/specific/utility.js \
src/specific/struct.js \
src/specific/entropy.js \
src/specific/anarpoint.js \
src/specific/gl-matrix-min.js \
src/specific/dat.gui.min.js \
\
src/webgl/webgl.js \
src/webgl/shader.js \
src/webgl/camera.js \
\
src/scene/point.js \
src/scene/line.js \
src/scene/scene.js \
src/scene/mouse.js \
\
src/config/state.js \
src/config/gui.js \
src/config/$conf_selected \
\
src/loop.js \
src/main.js \
\
| uglifyjs -o build/particle.js

#---------------------------
