#!/bin/sh
# Start the Astro dev server under the Node version specified in .nvmrc.
# Works on any machine with nvm installed.
export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
# shellcheck disable=SC1091
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
nvm use 2>/dev/null || nvm use 24 2>/dev/null || true
exec node node_modules/.bin/astro dev --root docs --port 4323
