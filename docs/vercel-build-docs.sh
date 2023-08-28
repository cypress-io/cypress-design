export GIT_BRANCH=$VERCEL_GIT_COMMIT_REF
echo "Building docs for branch $GIT_BRANCH"
yarn vite-ssg build