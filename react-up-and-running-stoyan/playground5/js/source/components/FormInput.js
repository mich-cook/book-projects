// @flow

import React, { Component } from 'react';

import Rating from './Rating';
import Suggest from './Suggest';

type FormInputFieldType = 'year' | 'suggest' | 'rating' | 'text';

// <Form> can use this for Props type since it is exported
// import type FormInputField from './FormInput.js';
export type FormInputFieldValue = string | number;

type Props = {
  "id": string,
  "defaultValue"?: FormInputFieldValue,
  "type"?: FormInputFieldType,
  "options"?: Array<string>
};

class FormInput extends Component<Props> {
  getValue():string {
    return 'value' in this.refs.input ?
      this.refs.input.value :
      this.refs.input.getValue();
  }

  render():Object {
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
