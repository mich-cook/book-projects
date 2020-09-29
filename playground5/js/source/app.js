import React from 'react';
import ReactDOM from 'react-dom';

import Datatable from './components/Datatable.js';

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

ReactDOM.render(
  <Datatable headers={headers} initialData={data} />,
  document.getElementById("react-app")
);
