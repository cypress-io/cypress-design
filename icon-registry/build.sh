node node_modules/.bin/svg-to-ts-constants
node ./build-icons.mjs
node ../node_modules/.bin/rollup -c ./rollup.config.mjs
node ../node_modules/.bin/tsc -p . --emitDeclarationOnly