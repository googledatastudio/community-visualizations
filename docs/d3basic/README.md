# Using external visualization libraries 

This code is the end result of the [external visualizations tutorial](https://developers.google.com/datastudio/visualization/external-libraries).

The [src](./src) folder contains the files needed for the visualization. To deploy the code, run the build script with with a GCP bucket path as a parameter.

```bash
bash build.sh gs://my-viz-bucket-path
```
## Try it out

To load the visualization, follow the instructions in the [codelab](https://codelabs.developers.google.com/codelabs/community-visualization/#10) and paste in the visualization ID: `gs://community-viz-docs/d3basic`.
