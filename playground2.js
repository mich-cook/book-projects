const headers = [ "mission", "shuttle", "date" ];
const data = {};

const Table = createReactClass({
  "render": function() {
    return (
      React.createElement("table", null,
        React.createElement("thead", null,
          React.createElement("tr", null, this.props.headers.map(function(heading, i) {
            return React.createElement("th", { "key": i }, heading);
      }))))
    );
  }
});

ReactDOM.render(
  React.createElement(Table, { headers, data }),
  document.getElementById("react-app")
);
