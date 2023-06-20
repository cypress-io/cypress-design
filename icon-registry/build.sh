# for some reason rollup hates to work with files that "just" got created
# we create this script to run the build to make sure that build can happen 
# without hickups

node node_modules/.bin/svg-to-ts-constants
node ./build-icons.mjs
node ../node_modules/.bin/rollup -c ./rollup.config.mjs
node ../node_modules/.bin/tsc -p . --emitDeclarationOnly