// create and add the canvas
var canvasElement = document.createElement('canvas');
var ctx = canvasElement.getContext('2d');
canvasElement.id = 'myViz';
document.body.appendChild(canvasElement);

function styleById(message){
  // parse the style object
  var styleById = {};

  for (let styleSection of vizData.config.style) {
    for (let styleElement of styleSection.elements) {
      styleById[element.id] = {
        value: element.value,
        defaultValue: element.defaultValue
      };
    }
  }
  return styleById;
}

function drawViz(vizData) {
  var ctx = canvasElement.getContext('2d');

  // clear the canvas.
  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // set the canvas width and height
  ctx.canvas.width = dscc.getWidth() - 20;
  ctx.canvas.height = dscc.getHeight() - 100;

  var styleById = styleById(message);

  // fill the bars using the user-selected bar color or the default
  ctx.fillStyle = styleById.barColor.value.color || styleById.barColor.defaultValue;
  ctx.fillRect(10, 10, 100, 100);

}

// subscribe to data and style changes.
dscc.subscribeToData(drawViz);
