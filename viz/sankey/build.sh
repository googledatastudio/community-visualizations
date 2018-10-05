#!/bin/bash
DEV_BUCKET="yulanlin-cv-dev/sankey"
PROD_BUCKET="public-community-viz-showcase-reports/sankey"

rm -rf deploy
mkdir -p deploy
cat ~/Code/ds-component/_bundles/dscc.js > deploy/sankey.js
cat src/d3.min.js >> deploy/sankey.js
cat src/d3-sankey.min.js >> deploy/sankey.js
cat src/index.js >> deploy/sankey.js

cp src/sankey.json deploy/sankey.json

# default to dev unless prod arg passed
if [ $1 == "-prod" ]
then
  echo "deploying to $PROD_BUCKET"
  cat src/manifest.json | sed -e "s|GCS_PARENT_BUCKET|gs://$PROD_BUCKET|" -e "s/DEVMODE_BOOL/false/" > deploy/manifest.json
  gsutil cp -a public-read deploy/* "gs://$PROD_BUCKET"
else
  echo "deploying to $DEV_BUCKET"
  cat src/manifest.json | sed -e "s|GCS_PARENT_BUCKET|$DEV_BUCKET|" -e "s/DEVMODE_BOOL/true/" > deploy/manifest.json
  gsutil cp -a public-read deploy/* "gs://$DEV_BUCKET"
fi
