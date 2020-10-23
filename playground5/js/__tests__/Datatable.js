jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-dom/test-utils';

import Datatable from '../source/components/Datatable.js';
import schema from '../source/schema.js';

// hard coded in app.js and need to fix
const headers = [ "mission", "shuttle", "date" ];
const data = [
{
  "mission": "1",
  "shuttle": "Challenger",
  "date": "6"
},
{
  "mission": "2",
  "shuttle": "Enterprise",
  "date": "7"
},
{
  "mission": "3",
  "shuttle": "Atlantis",
  "date": "8"
}
];

describe(`Tests for <Datatable>`, () => {
  it(`removes a row when told to delete`, () => {
    const callback = jest.fn();
    const table = TestUtils.renderIntoDocument(<Datatable schema={schema} initialData={data} onDataChange={callback} headers={headers} />);

    // delete first record
    TestUtils.Simulate.click(
      TestUtils.scryRenderedDOMComponentsWithClass(table, 'ActionsDelete')[0]
    );

    // confirm delete
    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(table, 'Button')
    );

    // 2 records after the third was deleted
    expect(callback.mock.calls[0][0].length).toBe(2);
  });
});
