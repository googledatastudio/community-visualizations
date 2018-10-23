// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function drawViz(vizData) {
  // parse the data into a row of rows format
  var data = dscc.rowsByConfigId(vizData).DEFAULT;
  var ctx = canvasElement.getContext('2d');

  // clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // set the width and height
  ctx.canvas.width = dscc.getWidth() - 20;
  ctx.canvas.height = dscc.getHeight() - 100;

  // scale the bar width and max bar height to the canvas
  var barWidth = ctx.canvas.width / (data.length * 2);
  var maxBarHeight = ctx.canvas.height - 20;

  // vertical offset for bar text
  var textYOffset = 20;

  // parse the style object
  var parsedStyle = {};

  for (let section of vizData.config.style) {
    for (let element of section.elements) {
      parsedStyle[element.id] = {
        value: element.value,
        defaultValue: element.defaultValue
      };
    }
  }

  // fill the bars using the user-selected bar color or the default
  ctx.fillStyle = parsedStyle.barColor.value.color || parsedStyle.barColor.defaultValue;

  // obtain the maximum bar metric value for scaling purposes
  var barData = data.map(function(row) {
    return row['barMetric'][0];
  });
  var metricMax = Math.max(...barData);


  // draw bars
  // add dimension labels below bars
  // 'barDimension' and 'barMetric' come from the id defined in myViz.json
  data.forEach(function(row, i) {
    var barHeight = Math.round(
      -1 * ((row['barMetric'][0] * maxBarHeight) / metricMax)
    );
    var barX = (ctx.canvas.width / data.length) * i + barWidth / 2;

    ctx.fillRect(barX, maxBarHeight, barWidth, barHeight);

    ctx.fillText(
      row['barDimension'][0],
      barX + barWidth / 4,
      maxBarHeight + textYOffset
    );
  });
}

// subscribe to data and style changes.
dscc.subscribeToData(drawViz);
