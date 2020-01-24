const dscc = require("@google/dscc");
const d3 = require("d3");

// parse the style value
const styleVal = (message, styleId) => {
  if (typeof message.style[styleId].defaultValue === "object") {
    return message.style[styleId].value.color !== undefined
      ? message.style[styleId].value.color
      : message.style[styleId].defaultValue.color;
  }
  return message.style[styleId].value !== undefined
    ? message.style[styleId].value
    : message.style[styleId].defaultValue;
};

const drawViz = messsage => {
  const margin = { left: 20, right: 20, top: 20, bottom: 20 };
  const height = dscc.getHeight() - 10;
  const width = dscc.getWidth();

  const chartHeight = height - margin.top - margin.bottom;
  const chartWidth = width - margin.left - margin.right;

  // remove existing svg
  d3.select("body")
    .selectAll("svg")
    .remove();

  // make a canvas
  const svg = d3
    .select("body")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // make an svg for the bar chart
  const chartSvg = svg
    .append("svg")
    .attr("x", margin.left)
    .attr("y", margin.top)
    .attr("width", chartWidth)
    .attr("height", chartHeight);

  // xScale to distribute bars
  const xScale = d3
    .scaleBand()
    .domain(messsage.tables.DEFAULT.map(d => d.dimension[0]))
    .range([0, chartWidth])
    .paddingInner(0.3);

  // yScale to size bars
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(messsage.tables.DEFAULT.map(d => d.metric[0]))])
    .range([0, chartHeight]);

  // get the user-selected bar color
  let barColor = styleVal(messsage, "barColor");

  // add bars
  const bars = chartSvg
    .append("g")
    .attr("class", "bars")
    .selectAll("rect.bars")
    .data(messsage.tables.DEFAULT)
    .enter()
    .append("rect")
    .attr("x", d => xScale(d.dimension[0]))
    .attr("y", d => chartHeight - yScale(d.metric[0]))
    .attr("width", xScale.bandwidth())
    .attr("height", d => yScale(d.metric[0]))
    .attr("fill", barColor);

  // add text
  const text = svg
    .append("g")
    .selectAll("text")
    .data(messsage.tables.DEFAULT)
    .enter()
    .append("text")
    .attr(
      "x",
      d => xScale(d.dimension[0]) + xScale.bandwidth() / 2 + margin.left
    )
    .attr("y", height - margin.bottom / 4)
    .attr("text-anchor", "middle")
    .attr("fill", barColor)
    .text(d => d.dimension[0]);
};

dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
