#!/bin/bash

###
# Instructions for use:
# TODO: Replace the DEV_BUCKET variable with the URI
# of your own GCS bucket.
###
DEV_BUCKET="community-viz-docs/codelab"

# remove the deploy folder if it exists
rm -rf deploy
# create a new deploy folder
mkdir -p deploy

# create the combined visualization JavaScript file
# TODO: Make sure that the location of dscc.min.js is correct
cat src/dscc.min.js src/myVizSource.js > deploy/myViz.js


# copy the CSS, config JSON, and manifest JSON to the deploy folder
cp src/myViz.css deploy/myViz.css
cp src/myViz.json deploy/myViz.json
cp src/manifest.json deploy/manifest.json

# deploy files to the GCS bucket
echo "deploying to $DEV_BUCKET"
cat src/manifest.json | sed -e "s|MY_GOOGLE_CLOUD_STORAGE_BUCKET|$DEV_BUCKET|" > deploy/manifest.json
gsutil cp -a public-read deploy/* "gs://$DEV_BUCKET"
