import React, { Component } from 'react';

import FluxStore from '../flux/Store.js';
import FluxActions from '../flux/Actions.js';

import Datatable from './Datatable.js';

class Missions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "count": FluxStore.getCount()
    };

    FluxStore.addListener('change', () => {
      this.setState({ "count": FluxStore.getCount() });
    });
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

//        <Datatable initialData={this.state.data} onDataChange={this.datatableDataChange.bind(this)} />
  render() {
    return (
      <div>
        <input placeholder="Filter Missions"
          onChange={FluxActions.filterData.bind(FluxActions)}
          onFocus={FluxActions.filterStart.bind(FluxActions)}
          onBlur={FluxActions.filterEnd.bind(FluxActions)} />
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
