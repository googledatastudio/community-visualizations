# Data Studio Community Visualization Interactions Demo

Data Studio [community visualizations][community viz] allow you to write custom
JavaScript visualizations for [Google Data Studio][datastudio].

## About this viz

This is an example of an svg bar chart that uses interactions in Data Studio. To
try it out in Data Studio, [load a visualization][load_viz] using the component
ID: `gs://community-viz-docs/filter-example`.

## How to use this code

Prerequisites:

[npm] and [gsutil] should be installed.

To get started:

1.  Run `npm install` from this directory.
1.  Replace `{{YOUR_GCS_BUCKET}}` with your GCS bucket path in
    `src/manifest.json`.*
1.  Run `npm run build` to build your code into the `build/` directory.
1.  Run `gsutil cp -a public-read build/* gs://YOUR_GCS_BUCKET` to deploy your
    code*
1.  [Load your visualization][load_viz] in Data Studio.

*   `{{YOUR_GCS_BUCKET}}` refers the GCS bucket where your visualization
    resources live. For example, `gs://community-viz-docs/filter-example`.

[community viz]: http://developers.google.com/datastudio/visualization
[datastudio]: https://datastudio.google.com
[write viz code]: https://developers.google.com/datastudio/visualization/write-viz
[npm]: https://www.npmjs.com/get-npm
[gsutil]: https://cloud.google.com/storage/docs/gsutil
[load_viz]: https://developers.google.com/datastudio/visualization/load-viz
