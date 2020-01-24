const dscc = require('@google/dscc');

const clearTable = () => {
  const table = document.getElementsByTagName("table");
  if (table.length > 0) {
    document.body.removeChild(table[0]);
  }
}

const setStyle = (data) => {
  const fontFamily = data.theme.themeAccentFontFamily;
  document.body.style.fontFamily = fontFamily;
  const fontColor = data.theme.themeAccentFontColor.color;
  document.body.style.color = fontColor;
}

const drawViz = (data) => {
  clearTable();
  setStyle(data);

  const table = document.createElement("table");
  const rows = data.tables.DEFAULT.rows; 

  // make the header
  const thead = document.createElement("thead");
  const thr = document.createElement("tr");
  for (let heading of data.tables.DEFAULT.headers){
    const th = document.createElement("th");
    const text = document.createTextNode(heading.name);
    th.appendChild(text);
    thr.appendChild(th);
  }
  thead.appendChild(thr);
  table.append(thead);

  // make the table body
  const body = document.createElement("tbody");
  for (let row of rows){
    const tr = document.createElement("tr");
    for (let cell of row){
      const td = document.createElement("td");
      const text = document.createTextNode(cell);
      td.appendChild(text)
      tr.appendChild(td);
    }
    body.appendChild(tr);
  } 
  table.append(body);

  // append the table to the DOM
  document.body.appendChild(table);
};

dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});
