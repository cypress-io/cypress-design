#!/bin/bash

##
## git branch --show-current
## is not a valid command on the CircleCI version of git
##
## export GIT_BRANCH_CURRENT=$(git branch --show-current)
export GIT_BRANCH_CURRENT=$(git rev-parse --abbrev-ref HEAD)

case "${GIT_BRANCH_CURRENT}" in
  master)
    export S3_BUCKET="design.cypress.io"
    ;;
  develop)
    export S3_BUCKET="design.stg.cypress.io"
    ;;
  *)
    export S3_BUCKET="design.dev.cypress.io"
    ;;
esac



ERROR=1
ERROR_MSG=""
if [ "x${AWS_ACCESS_KEY_ID}" == "x" ]; then
  export ERROR=0
  export ERROR_MSG="${ERROR_MSG}\nAWS_ACCESS_KEY_ID env var empty."
fi
if [ "x${AWS_SECRET_ACCESS_KEY}" == "x" ]; then
  export ERROR=0
  export ERROR_MSG="${ERROR_MSG}\nAWS_SECRET_ACCESS_KEY env var empty."
fi
if [ "x${S3_BUCKET}" == "x" ]; then
  export ERROR=0
  export ERROR_MSG="${ERROR_MSG}\nS3_BUCKET env var empty."
fi
if [ "x$(which aws)" == "x" ]; then
  export ERROR=0
  export ERROR_MSG="${ERROR_MSG}\nCould not find AWS CLI (aws)."
fi


if [ $ERROR == 0 ]; then
  echo
  echo "!! ERROR !!"
  echo -e $ERROR_MSG
  echo
  exit 1
fi


echo
echo "Pushing website to S3"
aws s3 sync storybook-static/ s3://${S3_BUCKET}/

echo



