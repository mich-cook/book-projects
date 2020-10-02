import React, { Component } from 'react';

import Rating from './Rating';
import Suggest from './Suggest';

class FormInput extends Component {
  getValue() {
    return 'value' in this.refs.input ?
      this.refs.input.value :
      this.refs.input.getValue();
  }

  render() {
    const baseline = {
      "id": this.props.id,
      "ref": "input",
      "defaultValue": this.props.defaultValue
    };

    switch(this.props.type) {
      case 'year':
        return <input {...baseline} type="number" defaultValue={this.props.defaultValue || new Date().getFullYear()} />;
      case 'suggest':
        return <Suggest {...baseline} options={this.props.options} />;
      case 'rating':
        return <Rating {...baseline} defaultValue={parseInt(this.props.defaultValue, 10)} />;
      case 'text':
        return <textarea {...baseline} />;
      default:
        return <input {...baseline} type="text" />;
    }
  }
}

/* PropTypes = {
  "type": PropTypes.oneOf([ "year", "suggest", "rating", "text", "input" ]),
  "id": PropTypes.string,
  "options": PropTypes.array,
  "defaultValue": PropTypes.any
}; */

export default FormInput;
