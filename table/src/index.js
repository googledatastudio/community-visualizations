const drawViz = (data) => {
  // print the data to a div
  if (document.querySelector('div')) {
    const oldDiv = document.querySelector('div');
    oldDiv.parentNode.removeChild(oldDiv);
  }
  const div = document.createElement('div');
  var msgText = JSON.stringify(data, null, 2);
  div.innerHTML = `<pre>${msgText}</pre>`;
  document.body.appendChild(div);

 //console.log the data 
 console.log(data);
};
dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});

