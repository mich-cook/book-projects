import React from 'react';
import ReactDOM from 'react-dom';

import Missions from './components/Missions.js';

import './index.css';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <main>
      <h1>NASA Space Shuttle Mission Navigator</h1>
      <Missions />
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
