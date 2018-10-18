var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
ctx.canvas.width = dscc.getWidth() - 20;
ctx.canvas.height = dscc.getHeight() - 40;
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function drawViz(vizData) {

    var data = dscc.rowsByConfigId(vizData).DEFAULT;
    // Place the canvas element on the page.
    var ctx = canvasElement.getContext('2d');

    var barWidth = ctx.canvas.width / (data.length * 2);
    var maxBarHeight = ctx.canvas.height - 20;

    // Clear the canvas.
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // 'barMetric' comes from the id defined in myViz.json
    var rowsMax = 0;
    for (var i = 0; i < data.length; i++) {

        if (data[i]['barMetric'][0]  / maxBarHeight > rowsMax ){
            rowsMax = data[i]['barMetric'][0] / maxBarHeight;
        }
    }

    // Use the Bar Color style element value to set the rectangle color.
    ctx.fillStyle = '#000000' || vizData.config.style[0].elements[0].value.color;

    // Calculate height and draw bars for each row of data.
    for (var i = 0; i < data.length; i++) {
        var barHeight = Math.round(
            -1 * (data[i]['barMetric'][0] / rowsMax)
        );
        var barX = (ctx.canvas.width / data.length) * i + barWidth / 2;
        // Draw bars.
        ctx.fillRect(barX, maxBarHeight, barWidth, barHeight);

        // Add dimension labels below bars.
        // 'barDimension' comes from the id defined in myViz.json
        ctx.fillText(
            data[i]['barDimension'][0],
            barX + barWidth / 4,
            maxBarHeight + 20
        );
    }
}

// Subscribe to Data and Style changes.
dscc.subscribeToData(drawViz);