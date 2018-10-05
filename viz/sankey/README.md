# Sankey community visualization

This code is a simple Sankey diagram intended for use with [Data Studio
Community
Visualizations](https://developers.google.com/datastudio/visualization).

## Deployment instructions
### Try it out
To load the visualization, follow the instructions in the
[codelab](https://codelabs.developers.google.com/codelabs/community-visualization/#10)
and paste in the visualization ID:
`gs://public-community-viz-showcase-reports/sankey`

### Deploy it yourself
To deploy it, review the codelab, and follow the `TODOs` in the [build
script](./build.sh) to make your own deployment.

## Examples and use cases demonstrated

* **Deployment management**
The build script provides one recommended workflow for managing development and
production versions of community visualizations by maintaining a `dev` and
`prod` version of the visualization that uses `devMode` to toggle caching.

* **Using Style**
The [config](./src/sankey.json) shows examples of using the style configuration
to expose select options to the end-user.
