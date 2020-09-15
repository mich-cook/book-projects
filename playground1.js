// NOTE: React.createClass() no longer exists
// NOTE: React.createFactory() is considered legacy and disuse is recommended
const Subtitle = React.memo(props =>
  React.createElement("h2", null, `And could have a subheading, ${props.name}`)
);

// uses an extra JS for this legacy stub so we can do propTypes
// as shown. other ways likely to follow.
const Description = createReactClass({
  "propTypes": { "color": PropTypes.string.isRequired },
  "getDefaultProps": function() { return { "color": "neon orange" }; },
  "render": function() {
    return React.createElement("p", null, `Without these, we might be ${this.props.color}`);
  }
});
// list of all propTypes also in Object.keys(PropTypes)

ReactDOM.render(
  // React.DOM.h1() in the book appears to be dead
  React.createElement(
    "div",
    { "id": "top", "className": "containers", "style": { "fontWeight": "bold" }},
    `The Heading`,
    React.createElement("h1", null, `Should contain an h1`),
    React.createElement(Subtitle, { "name": "Boberick" }),
    React.createElement(Description) // , { "color": "lime green" })
  ),
  document.getElementById("react-app")
);

// plenty more toys in Object.keys(React) and Object.keys(ReactDOM)
