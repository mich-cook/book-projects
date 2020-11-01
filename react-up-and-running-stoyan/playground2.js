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

  "componentDidMount": function() {
    document.onkeydown = function(e) {
      if (e.altKey && e.shiftKey && e.keyCode === 82) {
        this.replay();
      }
    }.bind(this);
  },

  // TODO: need bypass for replay to avoid constantly growing state log
  "componentDidUpdate": function(props, state) {
//    const item = (this.actionLog.length === 0) ? this.state : state;
//    this.actionLog.push(JSON.parse(JSON.stringify(item)));
  },

  "originalData": null,
  "actionLog": [],

  "propTypes": {
    "headers": PropTypes.arrayOf(PropTypes.string),
    "initialData": PropTypes.arrayOf(PropTypes.shape({
      "mission": PropTypes.string.isRequired,
      "shuttle": PropTypes.string.isRequired,
      "date": PropTypes.string.isRequired
    }))
  },

  "getInitialState": function() {
    return {
      "data": this.props.initialData,
      "sortBy": null,
      "descending": false,
      "editMarker": null,
      "searchDisplayed": false
    };
  },

  // TODO: look at this for undo/redo
  // TODO: hook this into componentDidUpdate, but bypass
  //   adding to the state on replay (which uses setState())
  "logThenSetState": function(state) {
    const item = (this.actionLog.length === 0) ? this.state : state;
    this.actionLog.push(JSON.parse(JSON.stringify(item)));
    this.setState(state);
  },

  "replay": function() {
    if (this.actionLog.length === 0) {
      console.warn(`Trying to replay an empty action log.`);
      return;
    }
    let i = -1;
    const interval = setInterval(function() {
      i += 1;
      if (i === this.actionLog.length - 1) {
        clearInterval(interval);
      }
      this.setState(this.actionLog[i]);
    }.bind(this), 1000);
  },

  "sort": function(e) {
    const column = e.target.dataset.column;
    const desc = (this.state.sortBy === column) ? !this.state.descending : false;
    let missions = Array.from(this.state.data);
    missions.sort(function(a,b) {
      if (desc === false) {
        return (a[column] > b[column]) ? 1 : -1;
      } else {
        return (a[column] < b[column]) ? 1 : -1;
      }
    });
    this.setState({ "data": missions, "descending": desc, "sortBy": column });
  },

  "editable": function(e) {
    const row = e.target.closest('tr').rowIndex - 1;
    const column = e.target.cellIndex;
    // not using dataset.column at the end to minimize confusion between the key and the var
    const key = document.querySelectorAll('table tr th')[column].dataset["column"];

    this.setState({ "editMarker": { "row": row, "column": column, "key": key }});
  },

  "updateTable": function(e) {
    e.preventDefault();

    let data = Array.from(this.state.data);
    const newVal = e.target.querySelector('input').value;

    data[this.state.editMarker.row][this.state.editMarker.key] = newVal;
    this.setState({ "data": data, "editMarker": null });
  },

  // TODO: handle multicolumn search
  "filterData": function(e) {
    const needle = e.target.value.toLowerCase();
    if (needle.length === 0) {
      this.setState({ "data": this.originalData });
      return;
    }

    const key = e.target.dataset["index"];

    const results = this.originalData.filter(function(mission) {
      return mission[key].toString().toLowerCase().includes(needle);
    });

    this.setState({ "data": results });
  },

  "showSearch": function() {
    if (this.state.searchDisplayed === false) {
      return null;
    }

    return (
      React.createElement("tr", { "onChange": this.filterData }, this.props.headers.map(function(heading, i) {
        return React.createElement("td", { "key": i },
          React.createElement("input", { "type": "text", "data-index": heading })
        );
      }))
    );
  },

  "toggleSearch": function() {
    if (this.state.searchDisplayed === true) {
      this.setState({ "data": this.originalData, "searchDisplayed": false });
      this.originalData = null;
    } else {
      this.originalData = this.state.data;
      this.setState({ "searchDisplayed": true });
    }
  },

  "download": function(format, e) {
    let data = '';
    if (format === 'json') data = JSON.stringify(this.state.data);
    if (format === 'csv') {
      // TODO
    }
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([data], { "type": `text/${format}` });
    e.target.href = URL.createObjectURL(blob);
    e.target.download = `data.${format}`;
  },

  "render": function() {
    return (
      React.createElement("div", null,
      React.createElement("div", null,
        React.createElement("button", { "onClick": this.toggleSearch, "className": "toolbar" }, `Search`),
        React.createElement("a", { "onClick": this.download.bind(this, 'json'), "className": "toolbar" }, `Export JSON`),
        React.createElement("a", { "onClick": this.download.bind(this, 'csv'), "className": "toolbar" }, `Export CSV`)
      ),
      React.createElement("table", null,
        React.createElement("thead", { "onClick": this.sort },
          React.createElement("tr", null, this.props.headers.map(function(heading, i) {
            let sortDir = '\u2195';  // updown by default
            if (heading === this.state.sortBy) {
              if (this.state.descending === false) { sortDir = "\u2193"; }
              else { sortDir = "\u2191"; }
            }
            return React.createElement("th", { "key": i, "data-column": heading }, heading + sortDir);
          }, this))
        ),
        React.createElement("tbody", { /* "onDoubleClick": this.editable */ },
          this.showSearch(),
          this.state.data.map(function(row, i) {
            if ((this.state.editMarker !== null) && (this.state.editMarker.row === i)) {
              let editField = React.createElement("form", { "onSubmit": this.updateTable },
                React.createElement("input", { "type": "text", "defaultValue": row[this.state.editMarker.key], "placeholder": row[this.state.editMarker.key] })
              );
              row[this.state.editMarker.key] = editField;
            }
            return (
              React.createElement("tr", { "key": i },
                React.createElement("td", null, row.mission),
                React.createElement("td", null, row.shuttle),
                React.createElement("td", null, row.date)
              )
            );
          }, this))
      )
      )
    );
  }
});

ReactDOM.render(
  React.createElement(Table, { headers, "initialData": data }),
  document.getElementById("react-app")
);
