import React, { Component } from 'react';

import Datatable from './Datatable.js';

class Missions extends Component {
  render() {
    return (
      <Datatable schema={this.props.schema} initialData={this.props.initialData} />
    );
  }
}

/*Missions.propTypes = {
  "schema": PropTypes.arrayOf(PropTypes.object),
  "initialData": PropTypes.arrayOf(PropTypes.object)
};*/

export default Missions;
