// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function drawViz(vizData) {
  var ctx = canvasElement.getContext('2d');

  // clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // set the canvas width and height
  ctx.canvas.width = dscc.getWidth() - 20;
  ctx.canvas.height = dscc.getHeight() - 100;

  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 100);

}

// subscribe to data and style changes.
dscc.subscribeToData(drawViz);
