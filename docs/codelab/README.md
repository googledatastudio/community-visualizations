# Community visualization codelab

This code is the end result of the [community visualization
codelab](https://codelabs.developers.google.com/).

The [src](./src) folder contains 4 `myVizSource.js` files, which each correspond
to a different step in the codelab. To deploy at each step, run the build
script with the corresponding `myVizSource.js` file as a parameter.

Filename           | Codelab step
-------------------|--------------------------
`myVizSource1.js`  | [Step 4](https://codelabs.developers.google.com/codelabs/community-visualization/#4)
`myVizSource2.js`  | [Step 12](https://codelabs.developers.google.com/codelabs/community-visualization/#12)
`myVizSource3.js`  | [Step 13](https://codelabs.developers.google.com/codelabs/community-visualization/#13)
`myVizSource4.js`  | [Step 14](https://codelabs.developers.google.com/codelabs/community-visualization/#14)


To use the bash build and deploy script, run the command below, replacing
`my-viz-bucket-path` with your own GCS bucket path, and `myVizSource1.js` with
the step in the codelab you want to build.

```bash
bash build.sh gs://my-viz-bucket-path src/myVizSource1.js
```

### Try it out
To load the visualization, follow the instructions in the
[codelab](https://codelabs.developers.google.com/codelabs/community-visualization/#10),
and paste in the visualization ID: `gs://community-viz-docs/codelab`.

## More info
Complete the codelab at
[codelabs.developers.google.com](https://codelabs.developers.google.com/codelabs/community-visualization)
for more context on how to use this code.
