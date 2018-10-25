// create a title element
var titleElement = document.createElement('div');
titleElement.id = 'myVizTitle';
document.body.appendChild(titleElement);

// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function transformStyleById(vizData){
  // parse the style object
  var styleById = {};

  for (let styleSection of vizData.config.style) {
    for (let styleElement of styleSection.elements) {
      styleById[styleElement.id] = {
        value: styleElement.value,
        defaultValue: styleElement.defaultValue
      };
    }
  }
  return styleById;
}

function drawViz(vizData) {
  // parse the data into a row of rows format
  var data = dscc.rowsByConfigId(vizData).DEFAULT;
  var ctx = canvasElement.getContext('2d');

  // clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // set the canvas width and height
  ctx.canvas.width = dscc.getWidth() - 20;
  ctx.canvas.height = dscc.getHeight() - 100;

  // scale the bar width and max bar height to the canvas
  var barWidth = ctx.canvas.width / (data.length * 2);
  var maxBarHeight = ctx.canvas.height - 20;

  // vertical offset for bar text
  var textYOffset = 20;

  var styleById = transformStyleById(vizData);

  // fill the bars using the user-selected bar color or the default
  ctx.fillStyle = styleById.barColor.value.color || styleById.barColor.defaultValue;

  // obtain the maximum bar metric value for scaling purposes
  var metricMax = 0;
  data.forEach(function(row){
    metricMax = Math.max(metricMax, row['barMetric'][0]);
  })


  // draw bars
  // add dimension labels below bars
  // 'barDimension' and 'barMetric' come from the id defined in myViz.json
  data.forEach(function(row, i) {
    // calculates the height of the bar using the row value, maximum bar
    // height, and the maximum metric value calculated earlier
    var barHeight = Math.round(
      -1 * ((row['barMetric'][0] * maxBarHeight) / metricMax)
    );

    // calculates the x coordinate of the bar based on the width of the convas
    // and the width of the bar
    var barX = (ctx.canvas.width / data.length) * i + barWidth / 2;

    ctx.fillRect(barX, maxBarHeight, barWidth, barHeight);

    var barText = row['barDimension'][0];
    var textX = barX + barWidth / 4;
    var textY = maxBarHeight + textYOffset;

    ctx.fillText(barText, textX, textY);
  });

  // Update the title element using dimension/metric names.
  var titleElement = document.getElementById('myVizTitle');

  // Get the fields indexed by Data Studio ID
  var fieldsById = dscc.fieldsById(vizData);

  // Get the Data Studio ID of the metric and dimension
  var metricId = vizData.config.data[0].elements[1].value[0];
  var dimensionId = vizData.config.data[0].elements[0].value[0];

  // Get the human-readable name of the metric and dimension
  var metricName = fieldsById[metricId].name;
  var dimensionName = fieldsById[dimensionId].name;

  titleElement.innerText = metricName + ' by ' + dimensionName;

}

// subscribe to data and style changes.
dscc.subscribeToData(drawViz);
