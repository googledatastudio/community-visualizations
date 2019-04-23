# Data Studio Community Visualization Interactions Demo

Data Studio [community visualizations][community viz] allow you to write custom
JavaScript visualizations for [Google Data Studio][datastudio].

## About this viz

This is an example of an svg bar chart that uses interactions in Data Studio.

## How to use this code

Prerequisites:

[npm] and [gsutil] should be installed.

The following commands will be useful.

npm run build: takes the code from src, bundles your js together

In order to build your code:

```bash
npm run build
```
In order to deploy your code:

```bash
gsutil cp -a public-read build/* gs://my-viz-bucket
```

[community viz]: http://developers.google.com/datastudio/visualization
[datastudio]: https://datastudio.google.com
[write viz code]: https://developers.google.com/datastudio/visualization/write-viz
[npm]: https://www.npmjs.com/get-npm
[gsutil]: https://cloud.google.com/storage/docs/gsutil
