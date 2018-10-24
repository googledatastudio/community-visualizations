// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function drawViz(vizData) {
  var ctx = canvasElement.getContext('2d');

  // clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // set the width and height
  ctx.canvas.width = dscc.getWidth() - 20;
  ctx.canvas.height = dscc.getHeight() - 100;

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

  // fill the bars using the user-selected bar color
  ctx.fillStyle = parsedStyle.barColor.value.color || parsedStyle.barColor.defaultValue;
  ctx.fillRect(10, 10, 100, 100);

}

// subscribe to data and style changes.
dscc.subscribeToData(drawViz);
