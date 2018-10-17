const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const devBucket = process.env.npm_package_config_gcs_dev_bucket;
const prodBucket = process.env.npm_package_config_gcs_prod_bucket;
const manifestFile = process.env.npm_package_config_manifest_file;
const jsFile = process.env.npm_package_config_js_file;
const jsonFile = process.env.npm_package_config_json_file;

// whether the command-line arg is "dev" or "prod"
const devMode = process.argv[2] === 'dev' ? true : false;
const bucketLocation = process.argv[2] === 'dev' ? devBucket : prodBucket;

const encoding = 'utf-8';

const readFile = (filePath, encoding) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

const compiler = webpack({
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    // this is the viz source code
    main: path.resolve(__dirname, '../src/', jsFile),
  },
  output: {
    filename: jsFile,
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new CopyWebpackPlugin([
      {from: path.join('./src', jsonFile), to: '.'}
    ]),
  ],
});

// put everything together except the manifest
compiler.run((err, stats) => {
  // once dist is created...
  readFile(path.join('./src', manifestFile), encoding).then(value => {
    const newManifest = value
      .replace(/YOUR_GCS_BUCKET/g, bucketLocation)
      .replace(/"DEVMODE_BOOL"/, devMode);
    writeFile(path.join('./dist', manifestFile), newManifest).catch(err => {
      console.log('Unable to write manifest: ', err);
    });
  });
});

// make appropriate substitutions to the manifest
