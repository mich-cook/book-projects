import React, { Component } from 'react';

import Datatable from './Datatable.js';

class Missions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "data": props.initialData
    };
    this.preFilterData = null;
  }

  datatableDataChange(data) {
    this.setState({ "data": data });
    this.commitToStorage(data);
  }

  commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  filterStart() {
    this.preFilterData = this.state.data;
  }

  filterEnd() {
    this.setState({ "data": this.preFilterData });
  }

  filterData(e) {
    const needle = e.target.value.toLowerCase();
    if (needle.length === 0) {
      this.setState({ "data": this.preFilterData });
      return;
    }

    const key = this.props.headers;  // improve to use this.props.schema.map(item => item.id); to match this.props.headers

    const results = this.preFilterData.filter(mission => {
      for (let f = 0; f < key.length; f += 1) {
        if (mission[key[f]].toString().toLowerCase().includes(needle) === true) {
          return true;
        }
      }
      return false;
    });

    this.setState({ "data": results });
  }

  render() {
    return (
      <div>
        <input placeholder="Filter Missions" onChange={this.filterData.bind(this)} onFocus={this.filterStart.bind(this)} onBlur={this.filterEnd.bind(this)} />
        <Datatable schema={this.props.schema} initialData={this.state.data} onDataChange={this.datatableDataChange.bind(this)} headers={this.props.headers} />
      </div>
    );
  }
}

/*Missions.propTypes = {
  "schema": PropTypes.arrayOf(PropTypes.object),
  "initialData": PropTypes.arrayOf(PropTypes.object)
};*/

export default Missions;
