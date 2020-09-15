// NOTE: React.createClass() no longer exists
// NOTE: React.createFactory() is considered legacy and disuse is recommended
const Subtitle = React.memo(props =>
  React.createElement("h2", null, `And could have a subheading, ${props.name}`)
);

ReactDOM.render(
  // React.DOM.h1() in the book appears to be dead
  React.createElement(
    "div",
    { "id": "top", "className": "containers", "style": { "fontWeight": "bold" }},
    `The Heading`,
    React.createElement("h1", null, `Should contain an h1`),
    React.createElement(Subtitle, { "name": "Boberick" })
  ),
  document.getElementById("react-app")
);

// plenty more toys in Object.keys(React) and Object.keys(ReactDOM)
