// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import { default as FluxStore } from './flux/Store.js';  // the long way around for renaming

import Missions from './components/Missions.js';

import schema from './schema.js';

FluxStore.init(schema);

const root = document.getElementById("react-app") || document.getElementsByTagName("body")[0];

ReactDOM.render(
  <main>
    <h1>NASA Mission Navigator</h1>
    <Missions />
  </main>,
  root
);
