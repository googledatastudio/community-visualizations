const dscc = require('@google/dscc');
import * as local from '../scripts/data/localData.js';

const LOCAL = false;

const onClick = (e) => {
  const barData = JSON.parse(e.srcElement.attributes.data.value);
  var FILTER = dscc.InteractionType.FILTER;
  var intxnData = {
    "concepts": [barData.dimId],
    "values": [[barData.dim]]
  };
  dscc.sendInteraction('onClick', FILTER, intxnData);
}

function drawViz(data) {

  var rowData = data.tables.DEFAULT;

  // set margins + canvas size
  const margin = { top: 10, bottom: 50, right: 10, left: 10 };
  const padding = { top: 15, bottom: 15};
  const height = dscc.getHeight() - margin.top - margin.bottom;
  const width = dscc.getWidth() - margin.left - margin.right;

  // remove the svg if it already exists
  if (document.querySelector('svg')) {
    var oldSvg = document.querySelector('svg');
    oldSvg.parentNode.removeChild(oldSvg);
  }

  const svg = document.createElementNS('http://www.w3.org/2000/svg', "svg");
  svg.setAttribute('height', `${height}`);
  svg.setAttribute('width', `${width}`);

  const maxBarHeight = height - padding.top - padding.bottom;
  const barWidth = width / (rowData.length * 2) ;



  // obtain the maximum bar metric value for scaling purposes
  var metricMax = 0;

  rowData.forEach(function (row) {
    metricMax = Math.max(metricMax, row['barMetric'][0]);
  });


  // draw bars
  // add dimension labels below bars
  // 'barDimension' and 'barMetric' come from the id defined in myViz.json
  rowData.forEach(function (row, i) {

    const barData = {
      'dim': row['barDimension'][0],
      'met': row['barMetric'][0],
      'dimId': data.fields['barDimension'][0].id
    }

    // calculates the height of the bar using the row value, maximum bar
    // height, and the maximum metric value calculated earlier
    var barHeight = Math.round(
      ((row['barMetric'][0] * maxBarHeight) / metricMax)
    );

    // calculates the x coordinate of the bar based on the width of the convas
    // and the width of the bar
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

    var barX = (width / rowData.length) * i + barWidth / 2;

    rect.setAttribute('x', barX);
    rect.setAttribute('y', maxBarHeight - barHeight);

    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('data', JSON.stringify(barData));
    rect.addEventListener('click', onClick);

    rect.style.fill = data.style.barColor.value? data.style.barColor.value.color : data.style.barColor.defaultValue;;

    svg.appendChild(rect);

    // add text labels
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    var textX = barX + barWidth/2;
    text.setAttribute('x', textX);
    text.setAttribute('text-anchor', 'middle');
    var textY = maxBarHeight + padding.top;
    text.setAttribute('y', textY);
    text.innerHTML = row['barDimension'][0];

    svg.appendChild(text);

  });

  document.body.appendChild(svg);
}

// renders locally
if (LOCAL) {
  drawViz(local.message);
} else {
  dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
}
