import React from 'react';
import ReactDOM from 'react-dom';

// import Logo from './components/Logo.js';
import Button from './components/Button.js';
import Suggest from './components/Suggest.js';
import Rating from './components/Rating.js';

ReactDOM.render(
  <div className="ComponentDemo">
    {/*<h2>Logo Component</h2>
    <Logo /> */}

    <h2>Button Component</h2>
    <Button>A Button Button</Button>
    <Button href="https://example.com/">An Anchor Button</Button>

    <h2>Suggest</h2>
    <Suggest options={[ "Lister", "Rimmer", "Cat", "Kryten", "Holly" ]} />

    <h2>Ratings</h2>
    <Rating />
    <Rating defaultValue={3} />
    <Rating max={3} />
    <Rating readonly={true} />

  </div>,
  document.getElementById("demo-app")
);
