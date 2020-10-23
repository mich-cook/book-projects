import React, {Component} from 'react';

class Suggest extends Component {
  getValue() {
    // using a ref to point at the DOM element
    // this is an alternative to using state
    // and requiring an onChange event on the element
    // to update the state when its value changes
    // onChange={e => this.setState({ "value": e.target.value })}
    return this.refs.lowlevelinput.value;
  }

  render() {
    const randomid = Math.random().toString(16).substring(2);
    return (
      <div className="Suggest">
        <input list={randomid} defaultValue={this.props.defaultValue} ref="lowlevelinput" id={this.props.id} />
        <datalist id={randomid}>{this.props.options.map((option, i) => <option value={option} key={i} />)}</datalist>
      </div>
    );
  }
}

export default Suggest;
