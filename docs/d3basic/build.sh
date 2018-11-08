#!/bin/bash

DSCC_LOCATION="https://raw.githubusercontent.com/googledatastudio/ds-component/b9ef28379f4d5ad6fba743f73d1b6a0fd73744c2/_bundles/dscc.min.js"
DEV_BUCKET=$1
D3_LOCATION=$2

# remove the deploy folder if it exists
rm -rf deploy
mkdir -p deploy

curl $DSCC_LOCATION > deploy/d3basic.js
cat $D3_LOCATION >> deploy/d3basic.js
echo >> deploy/d3basic.js
cat src/index.js >> deploy/d3basic.js

cp src/d3basic.json deploy/d3basic.json
cp src/d3basic.css deploy/d3basic.css

# deploy files to the GCS bucket
echo "deploying to $DEV_BUCKET"
sed "s|MY_GOOGLE_CLOUD_STORAGE_BUCKET|$DEV_BUCKET|" src/manifest.json > deploy/manifest.json
gsutil cp -a public-read deploy/* "gs://$DEV_BUCKET"

