#!/bin/bash
#---------------------------

#Requiere npm and uglify
#-------------
#npm install uglify-js -g
#-------------

echo -e "[\e[92m#\e[0m] Build JavaScript program..."

particle/build.sh

firefox index.html

echo -e "[\e[92m#\e[0m] Finished"

#---------------------------
