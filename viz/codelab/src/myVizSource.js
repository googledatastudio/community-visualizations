var canvasElement = document.createElement("canvas");
var ctx = canvasElement.getContext("2d");
ctx.canvas.width = dscc.getWidth() - 20;
ctx.canvas.height = dscc.getHeight() - 100;
canvasElement.id = "myViz";
document.body.appendChild(canvasElement);

var barWidth = 50;
var barGap = 10;
var maxBarHeight = 300;
var canvasPadding = 50;

function drawViz(vizData) {
  var data = dscc.rowsByConfigId(vizData).DEFAULT;
  // Place the canvas element on the page.
  var ctx = canvasElement.getContext("2d");

  // Clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // 'barMetric' comes from the id defined in myViz.json
  var rowsTotal = 0;
  for (var i = 0; i < data.length; i++) {
    rowsTotal += data[i]["barMetric"][0];
  }

  // Use the Bar Color style element value to set the rectangle color.
  ctx.fillStyle = vizData.config.style[0].elements[0].value.color;

  // Calculate height and draw bars for each row of data.
  for (var i = 0; i < data.length; i++) {
    var barHeight = Math.round(
      -1 * maxBarHeight * (data[i]["barMetric"][0] / rowsTotal)
    );
    var barX = (ctx.canvas.width / data.length) * i + barWidth / 2;
    // Draw bars.
    ctx.fillRect(barX, maxBarHeight, barWidth, barHeight);

    // Add dimension labels below bars.
    // 'barDimension' comes from the id defined in myViz.json
    ctx.fillText(
      data[i]["barDimension"][0],
      barX + barWidth / 4,
      maxBarHeight + 20
    );
  }
}

// Subscribe to Data and Style changes.
dscc.subscribeToData(drawViz);
