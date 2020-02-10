const dscc = require("@google/dscc");

// a global to keep track of state 
const state = {
  data: undefined,
  height: undefined,
  width: undefined,
  selected: undefined
};

// removes the selector if it already exists
const removeSelect = () => {
  let selector = document.getElementsByTagName("select");
  if (selector.length > 0) {
    document.body.removeChild(selector[0]);
  }
};

// what to do when user makes a selection
const click = (d, data) => {
  const FILTER = dscc.InteractionType.FILTER;
  const actionId = "onClick";
  const dimId = data.fields.dimensions[0].id;

  const filterData = {
    concepts: [dimId],
    values: [[d]]
  };
  dscc.sendInteraction(actionId, FILTER, filterData);
};

// check what is difference in the message
const whatChanged = data => {
  const changed = {
    data: false,
    size: false
  };
  const vals = data.tables.DEFAULT.rows.map(d => d[0]);
  if (JSON.stringify(vals) !== JSON.stringify(state.data)) {
    changed.data = true;
  }
  if (dscc.getHeight() !== state.height || dscc.getWidth() !== state.width) {
    changed.size = true;
  }
  return changed;
};

// make the selector
const makeSelect = data => {
  var vals = data.tables.DEFAULT.rows.map(d => d[0]);
  let selector = document.createElement("select");
  for (let dimVal of vals) {
    const option = document.createElement("option");
    option.setAttribute("value", dimVal);
    const optionText = document.createTextNode(dimVal);
    option.appendChild(optionText);
    selector.appendChild(option);
  }
  selector.addEventListener("change", function() {
    click(this.value, data);
  });

  document.body.appendChild(selector);
  state.data = vals;
  state.width = dscc.getWidth();
  state.height = dscc.getHeight();
};

// run every time a new message is sent
const drawViz = data => {
  let changed = whatChanged(data);

  // if data or height changed, redraw the selector
  if (changed.data || changed.size) {
    removeSelect();
    makeSelect(data);
  }
};

dscc.subscribeToData(drawViz, { transform: dscc.tableTransform });
