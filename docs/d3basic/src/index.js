dscc.subscribeToData(function(data) {
  var dataByConfigId = data.tables.DEFAULT;
  var styleByConfigId = data.style;

  // remove the canvas if it exists
  d3.select('body')
    .selectAll('svg')
    .remove();

  // set margins
  var margin = {left: 10, right: 10, top: 20, bottom: 20};

  // get the width and the height of the iframe
  var width = dscc.getWidth();
  var height = document.documentElement.clientHeight - 20;

  // parse the data for the bar chart into an array of objects
  var parsedData = dataByConfigId.map(function(d) {
    return {
      dimension: d['barDimension'][0],
      metric: d['barMetric'][0],
    };
  });

  // sort by dimension to order the data
  parsedData.sort(function(x, y) {
    return d3.ascending(x.dimension, y.dimension);
  });

  // make an svg to draw on
  var svg = d3
    .select('body')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height)
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // create a scale to determine the y-position of a bar
  var yScale = d3
    .scaleBand()
    .domain(
      parsedData.map(function(d) {
        return d.dimension;
      })
    )
    .range([0, height - margin.bottom])
    .paddingInner(0.3);

  // create a scale to determine the length of a bar
  var xScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(
        parsedData.map(function(d) {
          return d.metric;
        })
      ),
    ])
    .range([0, width - margin.right]);

  // create bars
  var bars = svg
    .selectAll('rect')
    .data(parsedData)
    .enter()
    .append('rect')
    .attr('y', function(d, i) {
      return yScale(d.dimension);
    })
    .attr('width', function(d) {
      return xScale(d.metric);
    })
    .attr('height', yScale.bandwidth())
    .style(
      'fill',
      styleByConfigId.barColor.value ? styleByConfigId.barColor.value.color : styleByConfigId.barColor.defaultValue
    );

  // add text to the bars
  var labels = svg
    .selectAll('text')
    .data(parsedData)
    .enter()
    .append('text')
    .text(function(d) {
      return d['dimension'];
    })
    .attr('y', function(d, i) {
      return yScale(d.dimension) + yScale.bandwidth() / 2;
    })
    .attr('x', 10);
}, {transform: dscc.objectTransform});
