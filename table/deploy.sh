#!/bin/bash

# concatenate all JavaScript into a single file
cat src/dscc.min.js > deploy/index.js
echo >> deploy/index.js
cat src/index.js >> deploy/index.js

# copy all other files into deploy
cp src/index.css deploy/index.css
cp src/index.json deploy/index.json
cp src/manifest.json deploy/manifest.json

# upload to GCS
gsutil cp -a public-read deploy/* gs://community-visualizations-codelabs/table
