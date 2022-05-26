#!bin/bash/

#npm install uglify-js -g

cat file1.js file2.js file3.js file4.js | uglifyjs -o files.min.js
