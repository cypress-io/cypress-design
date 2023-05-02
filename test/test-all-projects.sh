# !/bin/bash
set -e

# Define the ANSI escape code for light blue text
LIGHT_YELLOW='\033[1;34m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# move one directory up
cd $SCRIPT_DIR/..

pwd

echo "Starting..."

# Loop through each subdirectory and run "yarn build"
for dir in test/*/ ; do
  echo "--------"
  echo "Building ${BLUE}$dir${NC}..."
  npx start-server-and-test -- "yarn --cwd=$dir dev" http://localhost:5173 'yarn cypress run --e2e'
  npx start-server-and-test -- "yarn --cwd=$dir build && yarn vite preview $dir --port=5173" http://localhost:5173 'yarn cypress run --e2e'
  echo " "
  echo " "
done