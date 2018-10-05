#!/bin/bash
DEV_BUCKET="community-viz-docs/codelab"

rm -rf deploy
mkdir -p deploy

cat ~/Code/ds-component/_bundles/dscc.min.js src/myVizSource.js > deploy/myViz.js
cp src/myViz.css deploy/myViz.css
cp src/myViz.json deploy/myViz.json
cp src/manifest.json deploy/manifest.json

# default to dev unless prod arg passed
echo "deploying to $DEV_BUCKET"
cat src/manifest.json | sed -e "s|MY_GOOGLE_CLOUD_STORAGE_BUCKET|$DEV_BUCKET|" > deploy/manifest.json
gsutil cp -a public-read deploy/* "gs://$DEV_BUCKET"
