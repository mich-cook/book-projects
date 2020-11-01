jest.dontMock('../source/components/Actions.js')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

// scry throws a fit without this
import Wrap from './Wrap.js';

import Actions from '../source/components/Actions.js';

describe(`Render <Actions> components`, () => {
  it(`uses the callback`, () => {
    const callback = jest.fn();
    const actions = TestUtils.renderIntoDocument(
      <Wrap><Actions onAction={callback} /></Wrap>
    );
//    console.log(ReactDOM.findDOMNode(actions).outerHTML);

    const actionSpans = TestUtils.scryRenderedDOMComponentsWithTag(actions, 'span');
    expect(actionSpans.length).toBe(2);

    actionSpans.forEach(span => TestUtils.Simulate.click(span));

    const calls = callback.mock.calls;
    expect(calls.length).toBe(2);
    expect(calls[0][0]).toEqual('info');
    expect(calls[1][0]).toEqual('delete');

    TestUtils
      .scryRenderedDOMComponentsWithClass(actions, 'ActionsDelete')
      .forEach(span => TestUtils.Simulate.click(span));
    expect(calls.length).toBe(3);
    expect(calls[2][0]).toEqual('delete');

    const oneAndOnlyOne = TestUtils.findRenderedDOMComponentWithClass(actions, 'ActionsDelete');

    // Fails the test since there is more than one span tag
    // const oneAndOnlyOne2 = TestUtils.findRenderedDOMComponentWithTag(actions, 'span');
      
  });
});
