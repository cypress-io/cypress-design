git status
GIT_BRANCH=$(git branch --show-current)
echo "Building docs for branch $GIT_BRANCH"
yarn vitepress build docs