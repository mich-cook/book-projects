// @flow

import React from 'react';

import FluxStore from '../flux/Store.js';

import Actions from './Actions.js';
import Dialog from './Dialog.js';
import Form from './Form.js';

type Props = {
  "initialData": Object,
  "headers": Array<string>,
  "schema": Array<Object>,
  "onDataChange": Function
};

type State = {
  "data": Object,
  "sortBy": null | string,
  "descending": boolean,
  "editMarker": null | EditMarker,
  "searchDisplayed": boolean,
  "dialog": Object
};

type ActionLog = Array<Object>;

type DownloadEvent = {
  "target": {
    "href": string,
    "download": string
  }
};

type EditMarker = {
  "row": number,
  "column": number,
  "key": string
};

class Datatable extends React.Component<Props, State> {
  actionLog: ActionLog
  schema: Array<Object>;

  constructor(props: Props) {
    super(props);
    this.state = {
      "data": FluxStore.getData(),
      "sortBy": null,   // schema.id
      "descending": false,
      "editMarker": null,  // [row index, schema.id]
      "searchDisplayed": false,
      "dialog": null, // [type, index]
    };
//    this.originalData = null;
    this.schema = FluxStore.getSchema();
    this.actionLog = [];

    FluxStore.addListener('change', () => {
      this.setState({ "data": FluxStore.getData() });
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", function(e:KeyboardEvent) {
      if (e.altKey && e.shiftKey && e.keyCode === 82) {
        this.replay();
      }
    }.bind(this));
  }

/*
  // TODO: need bypass for replay to avoid constantly growing state log
  componentDidUpdate(props, state) {
//    const item = (this.actionLog.length === 0) ? this.state : state;
//    this.actionLog.push(JSON.parse(JSON.stringify(item)));
  }
*/

  // TODO: this needs to be replaced.
  // look here: https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component
/*
  UNSAFE_componentWillReceiveProps(props:Props) {
    this.setState({ "data": props.initialData });
  }

/*
  "propTypes": {
    "headers": PropTypes.arrayOf(PropTypes.string),
    "initialData": PropTypes.arrayOf(PropTypes.shape({
      "mission": PropTypes.string.isRequired,
      "shuttle": PropTypes.string.isRequired,
      "date": PropTypes.string.isRequired
    }))
  },
*/

  _fireDataChange(data:Object) {
    this.props.onDataChange(data);
  }

  actionClick(rowindex:number, action:string) {
    this.setState({ "dialog": { "type": action, "index": rowindex }});
  }

  /**
   *
   * Replay Functionality
   *
   **/

  // TODO: look at this for undo/redo
  // TODO: hook this into componentDidUpdate, but bypass
  //   adding to the state on replay (which uses setState())
  logThenSetState(state:Object) {
    const item = (this.actionLog.length === 0) ? this.state : state;
    this.actionLog.push(JSON.parse(JSON.stringify(item)));
    this.setState(state);
  }

  replay() {
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
  }

  /**
   *
   * Sort Functionality
   *
   **/

  sort(column:string) { // , e) {
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
    this._fireDataChange(missions);
  }

  /**
   *
   * Table edit functionality
   *   (that we're not using)
   *
   **/
/*
  editable(e) {
    const row = e.target.closest('tr').rowIndex - 1;
    const column = e.target.cellIndex;
    // not using dataset.column at the end to minimize confusion between the key and the var
    const key = document.querySelectorAll('table tr th')[column].dataset["column"];

    this.setState({ "editMarker": { "row": row, "column": column, "key": key }});
  }

  updateTable(e) {
    e.preventDefault();

    let data = Array.from(this.state.data);
    // SUGGESTED: const newVal = this.refs.input.getValue();
    const newVal = e.target.querySelector('input').value;

    data[this.state.editMarker.row][this.state.editMarker.key] = newVal;
    this.setState({ "data": data, "editMarker": null });
    this._fireDataChange(data);
  }
*/

  /**
   *
   * Filter Functionality
   *
   **/
/*
  // TODO: handle multicolumn filtering
  filterData(e:Event) {
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
  }

  showFilter():Object {
    if (this.state.searchDisplayed === false) {
      return null;
    }

    return (
      <tr onChange={this.filterData.bind(this)}>{this.props.headers.map((heading, i) =>
        <td key={i}><input type="text" data-index={heading}/></td>
      )}</tr>
    );
  }

  toggleFilter() {
    if (this.state.searchDisplayed === true) {
      this.setState({ "data": this.originalData, "searchDisplayed": false });
      this.originalData = null;
    } else {
      this.originalData = this.state.data;
      this.setState({ "searchDisplayed": true });
    }
  }
*/
  /**
   *
   * Dialog Stuff
   *
   **/
  deleteConfirmation(action:string) {
    if (action === 'dismiss') {
      this.closeDialog();
      return;
    }

    let data = Array.from(this.state.data);
    data.splice(this.state.dialog.index, 1);
    this.setState({ "dialog": null, "data": data });
    this._fireDataChange(data);
  }

  closeDialog() {
    this.setState({ "dialog": null });
  }

  saveDataDialog(action:string) {
    if (action === 'dismiss') {
      this.closeDialog();
      return;
    }

    let data = Array.from(this.state.data);
    data[this.state.dialog.index] = this.refs.form.getData();
    this.setState({ "dialog": null, "data": data });
    this._fireDataChange(data);
  }

  renderDialog():any {
    if (this.state.dialog === null) {
      return;
    }

    switch(this.state.dialog.type) {
      case 'delete':
        return this.renderDeleteDialog();
      case 'info':
        return this.renderFormDialog(true);
      case 'edit':
        return this.renderFormDialog();
      default:
        throw Error(`Dialog type undefined: ${this.state.dialog.type}`);
    }

  }

  renderDeleteDialog():Object {
    const first = this.state.data[this.state.dialog.index];
    const name = first[Object.keys(first)[0]];
    return (
      <Dialog modal={true} header="Confirm deletion"
              confirmLabel="Delete"
              onAction={this.deleteConfirmation.bind(this)}>
        {`Please confirm delete for mission: ${name}`}
      </Dialog>
    );
  }

  renderFormDialog(readonly?:boolean):Object {
    return (
      <Dialog modal={true} hasCancel={!readonly} confirmLabel={readonly ? 'ok' : 'Save'}
              header={readonly ? 'Item info' : 'Edit item'}
              onAction={this.saveDataDialog.bind(this)}>
        <Form ref="form" fields={this.schema} readonly={readonly}
              initialData={this.state.data[this.state.dialog.index]} missionId={this.state.dialog.index} />
      </Dialog>
    );
  }

  /**
   *
   * Table edit functionality
   *   (that we're not using)
   *
   **/
  download(format:string, e:DownloadEvent) {
    let data = '';
    if (format === 'json') data = JSON.stringify(this.state.data);
    if (format === 'csv') {
      // TODO
    }
    const URL = window.URL || window.webkitURL;
    const blob = new Blob([data], { "type": `text/${format}` });
    e.target.href = URL.createObjectURL(blob);
    e.target.download = `data.${format}`;
  }

  renderToolbar():Object {
    return (
      <div>
        {/*<button onClick={this.toggleFilter.bind(this)} className="toolbar">Search</button>*/}
        <a onClick={this.download.bind(this, 'json')} className="toolbar">Export JSON</a>
        <a onClick={this.download.bind(this, 'csv')} className="toolbar">Export CSV</a>
      </div>
    );
  }

  renderTableHeader():Object {
    return (
      <thead>
        <tr>{this.schema.map(function(item, i) {
          if (item.show === false) return null;

          let sortDir = '\u2195';  // uprown by default

          if (item.id === this.state.sortBy) {
            if (this.state.descending === false) { sortDir = '\u2193'; }
            else { sortDir = '\u2191'; }
          }
          return <th key={i} onClick={this.sort.bind(this, item.id)}>{item.label} {sortDir}</th>;
        }, this)}<th>Details</th></tr>
      </thead>
    );
  }

  renderTableData():Object {
    const order = this.schema.reduce(function(result, item) {
      if (item.show === false)  return result;
      return result.concat(item.id);
    }, []);

    return (
      this.state.data.map(function(row, i) {
        return <tr key={i}>
          {order.map((key,j) => <td key={j}>{row[key]}</td>)}
          <td><Actions onAction={this.actionClick.bind(this, i)} /></td>
        </tr>;
      }, this)
    );
  }

  render():Object {
    return (
      <div className="Datatable">
        {this.renderToolbar()}
        <table>
          {this.renderTableHeader()}
          <tbody>
            {/*this.showFilter()*/}
            {this.renderTableData()}
          </tbody>
        </table>
        {this.renderDialog()}
      </div>
    );
  }

}

export default Datatable;
