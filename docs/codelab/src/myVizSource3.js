// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function drawViz(data) {
  var rowData = data.tables.DEFAULT;
  var ctx = canvasElement.getContext('2d');

  // clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // set the canvas width and height
  ctx.canvas.width = dscc.getWidth() - 20;
  ctx.canvas.height = dscc.getHeight() - 100;

  // scale the bar width and max bar height to the canvas
  var barWidth = ctx.canvas.width / (rowData.length * 2);
  var maxBarHeight = ctx.canvas.height - 20;

  // vertical offset for bar text
  var textYOffset = 20;

  ctx.fillStyle = data.style.barColor.value.color || data.style.barColor.defaultValue;

  // obtain the maximum bar metric value for scaling purposes
  var metricMax = 0;
  rowData.forEach(function(row){
    metricMax = Math.max(metricMax, row['barMetric'][0]);
  })

  // draw bars
  // add dimension labels below bars
  // 'barDimension' and 'barMetric' come from the id defined in myViz.json
  rowData.forEach(function(row, i) {

    // calculates the height of the bar using the row value, maximum bar
    // height, and the maximum metric value calculated earlier
    var barHeight = Math.round(
        -1 * ((row['barMetric'][0] * maxBarHeight) / metricMax)
    );

    // calculates the x coordinate of the bar based on the width of the convas
    // and the width of the bar
    var barX = (ctx.canvas.width /rowData.length) * i + barWidth / 2;

    ctx.fillRect(barX, maxBarHeight, barWidth, barHeight);

    var barText = row['barDimension'][0];
    var textX = barX + barWidth / 4;
    var textY = maxBarHeight + textYOffset;

    ctx.fillText(barText, textX, textY);
  });

}

// subscribe to data and style changes.
dscc.subscribeToData(drawViz, {transform: dscc.objectTransform});
