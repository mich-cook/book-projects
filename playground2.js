const headers = [ "mission", "shuttle", "date" ];
const data = [
{
  "mission": "1",
  "shuttle": "Challenger",
  "date": "6"
},
{
  "mission": "2",
  "shuttle": "Enterprise",
  "date": "7"
},
{
  "mission": "3",
  "shuttle": "Atlantis",
  "date": "8"
}
];

const Table = createReactClass({

  "getInitialState": function() {
    return { "data": this.props.initialData };
  },

  "render": function() {
    return (
      React.createElement("table", null,
        React.createElement("thead", null,
          React.createElement("tr", null, this.props.headers.map(function(heading, i) {
            return React.createElement("th", { "key": i }, heading);
          }))
        ),
        React.createElement("tbody", null, this.state.data.map(function(row, i) {
          return (
            React.createElement("tr", null, [
              React.createElement("td", null, row.mission),
              React.createElement("td", null, row.shuttle),
              React.createElement("td", null, row.date)
            ])
          );
        }))
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Table, { headers, "initialData": data }),
  document.getElementById("react-app")
);
