import React, { Component } from 'react';

import Datatable from './Datatable.js';

class Missions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "data": props.initialData
    };
  }

  datatableDataChange(data) {
    this.setState({ "data": data });
    this.commitToStorage(data);
  }

  commitToStorage(data) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  render() {
    return (
      <Datatable schema={this.props.schema} initialData={this.state.data} onDataChange={this.datatableDataChange.bind(this)} headers={this.props.headers} />
    );
  }
}

/*Missions.propTypes = {
  "schema": PropTypes.arrayOf(PropTypes.object),
  "initialData": PropTypes.arrayOf(PropTypes.object)
};*/

export default Missions;
