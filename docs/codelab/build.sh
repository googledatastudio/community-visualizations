#!/bin/bash

DSCC_LOCATION="https://raw.githubusercontent.com/googledatastudio/ds-component/b9ef28379f4d5ad6fba743f73d1b6a0fd73744c2/_bundles/dscc.min.js"
DEV_BUCKET=$1
SOURCE_FILE=$2

# remove the deploy folder if it exists
rm -rf deploy
# create a new deploy folder
mkdir -p deploy

curl $DSCC_LOCATION > deploy/myViz.js
cat $SOURCE_FILE >> deploy/myViz.js


# copy the CSS, config JSON, and manifest JSON to the deploy folder
cp src/myViz.css deploy/myViz.css
cp src/myViz.json deploy/myViz.json
cp src/manifest.json deploy/manifest.json

# deploy files to the GCS bucket
echo "deploying to $DEV_BUCKET"
cat src/manifest.json | sed -e "s|MY_GOOGLE_CLOUD_STORAGE_BUCKET|$DEV_BUCKET|" > deploy/manifest.json
gsutil cp -a public-read deploy/* "$DEV_BUCKET"
