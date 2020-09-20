// NOTE: React.createClass() no longer exists
// NOTE: React.createFactory() is considered legacy and disuse is recommended
// NOTE: componentWillReceiveProps() is also gone:
//   https://fb.me/react-derived-state
//   https://fb.me/react-unsafe-component-lifecycles

const logMixin = {
  "_log": function(name, args) {
    console.log(`${this.name} component ${name}: `, args);
  },
  "componentDidMount": function() {
    this._log(`componentDidMount`, arguments);
  },
  "componentDidUpdate": function() {
    this._log(`componentDidUpdate`, arguments);
  },
  "componentWillUmount": function() {
    this._log(`componentWillUnmount`, arguments);
  }
};

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

const Colorpreview = createReactClass({
  "name": "Color Preview",
  "mixins": [ logMixin ],
  "propTypes": { "hex": PropTypes.string.isRequired },
  "getDefaultProps": function() { return { "hex": "#ffffff"}; },
  "render": function() {
    return  React.createElement("div", { "style": { "height": "20px", "width": "20px", "display": "inline-block", "backgroundColor": this.props.hex }})
  }
});

// rudimentary stateful component also using createReactClass (separate deprecated JS script)
// and proptypes
const Colors = createReactClass({
  "name": "Colors",
  "mixins": [logMixin],
  "propTypes": { "initialHex": PropTypes.string.isRequired },
  "getDefaultProps": function() { return { "hex": "#ff00ff" }; },
  "getInitialState": function() { return { "hex": this.props.initialHex }},
  "handleHexChange": function(e) { this.setState({ "hex": e.target.value }); },
  //"componentDidMount": function() {},
  "componentDidUpdate": function(prevProps, prevState) {
    if (this.state.hex.length > 7) this.replaceState(prevState);  // hex should only be 6 chars with # prepend
  },
  // "componentWillUnmount": function() {},
  // componentWillMount and componentWillUpdate are deprecated.
  // "shouldComponetUpdate": function() { /* don't update */  return false; },
  "render": function() {
    return React.createElement(
      "div",
      null,
      React.createElement("input", { "value": this.state.hex, "onChange": this.handleHexChange, "style": { "display": "inline-block" }}),
      React.createElement(Colorpreview, { "hex": this.state.hex })
    );
  }
});

ReactDOM.render(
  // React.DOM.h1() in the book appears to be dead
  React.createElement(
    "div",
    { "id": "top", "className": "containers", "style": { "fontWeight": "bold" }},
    `The Heading`,
    React.createElement("h1", null, `Should contain an h1`),
    React.createElement(Subtitle, { "name": "Boberick" }),
    React.createElement(Description, { "color": "lime green" }),
    React.createElement(Colors, { "initialHex": "#ae5463" })
  ),
  document.getElementById("react-app")
);

// plenty more toys in Object.keys(React) and Object.keys(ReactDOM)
