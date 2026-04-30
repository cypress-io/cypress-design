export GIT_BRANCH=$VERCEL_GIT_COMMIT_REF
echo "Building docs for branch $GIT_BRANCH"
# Regenerate hosted token stylesheets into docs/public/ so Vercel serves
# them at design.cypress.io/{colors,tokens}.css.
yarn workspace @cypress-design/css build:colors-css
yarn vitepress build docs