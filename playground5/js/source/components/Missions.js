import React, { Component } from 'react';

import Datatable from './Datatable.js';

class Missions extends Component {
  render() {
    return (
      <Datatable schema={this.props.schema} initialData={this.props.initialData} />
    );
  }
}

export default Missions;
