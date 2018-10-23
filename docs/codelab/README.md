# Community visualization codelab

This code is the end result of the [community visualization
codelab](https://codelabs.developers.google.com/). To use the [build
script](./build.sh), pass in your own GCS bucket path, for example:

The [src](./src) folder contains 4 `myVizSource.js` files, which each correspond
to a different step in the codelab. To deploy at each step, edit the build
script to build the corresponding `myVizSource.js` file.

Filename           | Codelab step
-------------------|--------------------------
`myVizSource1.js`  | [Step 4](https://codelabs.developers.google.com/codelabs/community-visualization/#4)
`myVizSource2.js`  | [Step 12](https://codelabs.developers.google.com/codelabs/community-visualization/#12)
`myVizSource3.js`  | [Step 13](https://codelabs.developers.google.com/codelabs/community-visualization/#13)
`myVizSource4.js`  | [Step 14](https://codelabs.developers.google.com/codelabs/community-visualization/#14)

```bash
bash build.sh gs://my-viz-bucket-path
```

### Try it out
To load the visualization, follow the instructions in the
[codelab](https://codelabs.developers.google.com/codelabs/community-visualization/#10),
and paste in the visualization ID: `gs://community-viz-docs/codelab`.

## More info
Complete the codelab at
[codelabs.developers.google.com](https://codelabs.developers.google.com/codelabs/community-visualization)
for more context on how to use this code.
