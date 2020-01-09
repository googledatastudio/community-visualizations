const dscc = require('@google/dscc');

const clearTable = () => {
  let table = document.getElementsByTagName("TABLE");
  if (table.length > 0) {
    document.body.removeChild(table[0]);
  }
}

const setStyle = (data) => {
  let fontFamily = data.theme.themeAccentFontFamily;
  document.body.style.fontFamily = fontFamily;
  let fontColor = data.theme.themeAccentFontColor.color;
  document.body.style.color = fontColor;
}

const drawViz = (data) => {
  clearTable();
  setStyle(data);

  let table = document.createElement("table");
  var rows = data.tables.DEFAULT.rows; 

  // make the header
  let th = document.createElement("th");
  let thr = document.createElement("tr");
  for (let heading of data.tables.DEFAULT.headers){
    let td = document.createElement("td");
    let text = document.createTextNode(heading.name);
    td.appendChild(text);
    thr.appendChild(td);
  }
  th.appendChild(thr);
  table.append(th);

  // make the table body
  let body = document.createElement("tbody");
  for (let row of rows){
    var tr = document.createElement("tr");
    for (let cell of row){
      let td = document.createElement("td");
      let text = document.createTextNode(cell);
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
