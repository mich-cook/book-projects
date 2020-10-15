import React, { Component } from 'react';

import Datatable from './Datatable.js';

class Missions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "data": props.initialData
    };
  }

  render() {
    return (
      <Datatable schema={this.props.schema} initialData={this.state.data} />
    );
  }
}

/*Missions.propTypes = {
  "schema": PropTypes.arrayOf(PropTypes.object),
  "initialData": PropTypes.arrayOf(PropTypes.object)
};*/

export default Missions;
