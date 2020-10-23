jest.dontMock('../source/components/Button.js')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

import Button from '../source/components/Button.js';

describe(`Render <Button> components`, () => {

  it(`as an <a> button when href`, () => {
    const a = TestUtils.renderIntoDocument(
      <div><Button href="#">Hello</Button></div>
    );
    expect(ReactDOM.findDOMNode(a).children[0].nodeName).toEqual('A');
  });

  it(`as a <button> button without href`, () => {
    const button = TestUtils.renderIntoDocument(
      <div><Button>Hello</Button></div>
    );
    // what did the markup show?
    // console.log(ReactDOM.findDOMNode(button).outerHTML);
    expect(ReactDOM.findDOMNode(button).children[0].nodeName).toEqual('BUTTON');
  });

  it(`with the class "Button" for <button>`, () => {
    const button = TestUtils.renderIntoDocument(
      <div><Button>Hello</Button></div>
    );
    expect(ReactDOM.findDOMNode(button).children[0].getAttribute('class')).toEqual('Button');
  });

});
