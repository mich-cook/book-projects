import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

const button = TestUtils.renderIntoDocument(
  <button onClick={e => e.target.innerHTML = `Bye!`}>Hello</button>
);

describe(`We can render a button`, () => {
  it(`changes the text after a click`, () => {
    expect(ReactDOM.findDOMNode(button).textContent).toEqual(`Hello`);
    TestUtils.Simulate.click(button);
    expect(ReactDOM.findDOMNode(button).textContent).toEqual(`Bye!`);
  });
});
