// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import Missions from './components/Missions.js';

import schema from './schema.js';

const headers = [ "mission", "shuttle", "date" ];

const sampleData = [
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

let data = JSON.parse(localStorage.getItem('data') || '{}');

if (Object.keys(data).length === 0 && data.constructor === Object) {
  data = sampleData;
/*
  // THEIR SUGGESTION FOR DEFAULT DATA
  data = {};
  schema.forEach(item => data[item.id] = item.sample);
  data = [ data ];
*/
}

const root = document.getElementById("react-app") || document.getElementsByTagName("body")[0];

ReactDOM.render(
  <main>
    <h1>NASA Mission Navigator</h1>
    <Missions headers={headers} schema={schema} initialData={data} />
  </main>,
  root
);
