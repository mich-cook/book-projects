ReactDOM.render(
  // React.DOM.h1() in the book appears to be dead
  React.createElement(
    "div",
    { "id": "top", "className": "containers", "style": { "fontWeight": "bold" }},
    `The Heading`,
    React.createElement("h1", null, `Should contain an h1`)
  ),
  document.getElementById("react-app")
);

// plenty more toys in Object.keys(React) and Object.keys(ReactDOM)
