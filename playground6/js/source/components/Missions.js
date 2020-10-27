import React, { Component } from 'react';

import FluxStore from '../flux/Store.js';

import Datatable from './Datatable.js';

class Missions extends Component {

  constructor(props) {
    super(props);
    this.state = {
//      "data": props.initialData,
      "count": FluxStore.getCount()
    };

    FluxStore.addListener('change', () => {
      this.setState({ "count": FluxStore.getCount() });
    });

    this.preFilterData = null;
  }

  shouldComponentUpdate(props: Object, state: State): boolean {
    return state.count !== this.state.count;
  }

  datatableDataChange(data) {
    this.setState({ "data": data });
    this.commitToStorage(data);
  }

  commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  filterStart() {
    this.preFilterData = FluxStore.getData(); // this.state.data;
  }

  filterEnd() {
    this.setState({ "data": FluxStore.getData() /*this.preFilterData */ });
  }

  filterData(e) {
    const needle = e.target.value.toLowerCase();
    if (needle.length === 0) {
      this.setState({ "data": this.preFilterData });
      return;
    }

    const key = FluxStore.getHeaders(); // this.props.headers;  // improve to use this.props.schema.map(item => item.id); to match this.props.headers

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

//        <Datatable initialData={this.state.data} onDataChange={this.datatableDataChange.bind(this)} />
  render() {
    return (
      <div>
        <input placeholder="Filter Missions" onChange={this.filterData.bind(this)} onFocus={this.filterStart.bind(this)} onBlur={this.filterEnd.bind(this)} />
        <Datatable />
      </div>
    );
  }
}

/*Missions.propTypes = {
  "schema": PropTypes.arrayOf(PropTypes.object),
  "initialData": PropTypes.arrayOf(PropTypes.object)
};*/

export default Missions;
