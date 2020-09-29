import React from 'react';
import ReactDOM from 'react-dom';

// import Logo from './components/Logo.js';
import Button from './components/Button.js';

ReactDOM.render(
  <div className="ComponentDemo">
    {/*<h2>Logo Component</h2>
    <Logo /> */}

    <h2>Button Component</h2>
    <Button>A Button Button</Button>
    <Button href="https://example.com/">An Anchor Button</Button>
  </div>,
  document.getElementById("demo-app")
);
