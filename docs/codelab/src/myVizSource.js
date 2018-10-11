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
  for (let row of data){
    rowsTotal += row["barMetric"][0];
  }

  // parse the style to an object with keys "configId": "value"
  var parsedStyle = {};
  for (let section of vizData.config.style) {
    for (let element of section.elements){
      parsedStyle[element.id] = element.value;
    }
  }

  // Use the Bar Color style element value to set the rectangle color.
  ctx.fillStyle = parsedStyle.barColor.color;


  var textYOffset = 20;

  // Calculate height and draw bars for each row of data.
  data.forEach(function(row, i){
    var barHeight = Math.round(
      -1 * maxBarHeight * (row["barMetric"][0] / rowsTotal)
    );
    var barX = (ctx.canvas.width / data.length) * i + barWidth / 2;
    // Draw bars.
    ctx.fillRect(barX, maxBarHeight, barWidth, barHeight);

    // Add dimension labels below bars.
    // 'barDimension' comes from the id defined in myViz.json
    ctx.fillText(
      row["barDimension"][0],
      barX + barWidth / 4,
      maxBarHeight + textYOffset
    );

  });

}
// Subscribe to Data and Style changes.
dscc.subscribeToData(drawViz);
