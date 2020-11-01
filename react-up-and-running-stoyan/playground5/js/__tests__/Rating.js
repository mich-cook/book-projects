jest.dontMock('../source/components/Rating.js')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';

// scry throws a fit without this
import Wrap from './Wrap.js';

import Rating from '../source/components/Rating.js';

describe(`Render <Rating> components`, () => {
  it(`highlights stars on hover`, () => {
    const component = TestUtils.renderIntoDocument(<Rating />);
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');

    // ensure nothing is lit
    expect(stars[0].className).toBeFalsy();
    expect(stars[1].className).toBeFalsy();
    expect(stars[2].className).toBeFalsy();
    expect(stars[3].className).toBeFalsy();
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(0);
    expect(component.state.tmpRating).toBe(0);

    TestUtils.Simulate.mouseOver(stars[3]);
    expect(stars[0].className).toBe('RatingOn');
    expect(stars[1].className).toBe('RatingOn');
    expect(stars[2].className).toBe('RatingOn');
    expect(stars[3].className).toBe('RatingOn');
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(0);
    expect(component.state.tmpRating).toBe(4);

  });

  // known bug.
  xit(`dims stars on mouseout`, () => {
    const component = TestUtils.renderIntoDocument(<Rating />);
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');

    // ensure nothing is lit
    expect(stars[0].className).toBeFalsy();
    expect(stars[1].className).toBeFalsy();
    expect(stars[2].className).toBeFalsy();
    expect(stars[3].className).toBeFalsy();
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(0);
    expect(component.state.tmpRating).toBe(0);

    TestUtils.Simulate.mouseOver(stars[3]);
    expect(stars[0].className).toBe('RatingOn');
    expect(stars[1].className).toBe('RatingOn');
    expect(stars[2].className).toBe('RatingOn');
    expect(stars[3].className).toBe('RatingOn');
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(0);
    expect(component.state.tmpRating).toBe(4);

    TestUtils.Simulate.mouseOut(stars[3]);
    expect(stars[0].className).toBeFalsy();
    expect(stars[1].className).toBeFalsy();
    expect(stars[2].className).toBeFalsy();
    expect(stars[3].className).toBeFalsy();
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(0);
    expect(component.state.tmpRating).toBe(0);
  });

  it(`sets shown rating on click`, () => {
    const component = TestUtils.renderIntoDocument(<Rating />);
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(component, 'span');

    // ensure nothing is lit
    expect(stars[0].className).toBeFalsy();
    expect(stars[1].className).toBeFalsy();
    expect(stars[2].className).toBeFalsy();
    expect(stars[3].className).toBeFalsy();
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(0);
    expect(component.state.tmpRating).toBe(0);

    TestUtils.Simulate.click(stars[3]);
    expect(stars[0].className).toBe('RatingOn');
    expect(stars[1].className).toBe('RatingOn');
    expect(stars[2].className).toBe('RatingOn');
    expect(stars[3].className).toBe('RatingOn');
    expect(stars[4].className).toBeFalsy();
    expect(component.state.rating).toBe(4);
    expect(component.state.tmpRating).toBe(4);

  });
});
