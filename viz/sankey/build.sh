#!/bin/bash
###
# Instructions for use:
# TODO: Replace the DEV_BUCKET and PROD_BUCKET variables with the URI
# of your own GCS bucket.
# Usage:
# To deploy to the DEV_BUCKET with devMode: true,
# $bash build.sh
# To deploy to the PROD_BUCKET with devMode: false,
# $bash build.sh -prod
###
DEV_BUCKET="yulanlin-cv-dev/sankey"
PROD_BUCKET="public-community-viz-showcase-reports/sankey"

# remove the deploy folder if it exists
rm -rf deploy
# create a new deploy folder
mkdir -p deploy

# create the combined visualization JavaScript file
# TODO: Make sure that the location of dscc.min.js is correct
# TODO: Make sure that the location of d3.min.js and d3-sankey.min.js are
# correct

cat src/dscc.min.js src/d3.min.js src/d3-sankey.min.js src/index.js  > deploy/sankey.js

cp src/sankey.json deploy/sankey.json
cp src/manifest.json deploy/manifest.json

# Toggle whether or not to deploy to dev or prod buckets
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
