import React from 'react';
import ReactDOM from 'react-dom';

// import Logo from './components/Logo.js';
import Button from './components/Button.js';
import Suggest from './components/Suggest.js';
import Rating from './components/Rating.js';
import FormInput from './components/FormInput.js';
import Form from './components/Form.js';

const rDCrew = [ "Lister", "Rimmer", "Cat", "Kryten", "Holly" ];

ReactDOM.render(
  <div className="ComponentDemo">
    {/*<h2>Logo Component</h2>
    <Logo /> */}

    <h2>Button Component</h2>
    <Button>A Button Button</Button>
    <Button href="https://example.com/">An Anchor Button</Button>

    <Form
      fields={[
        { "label": "'Native' Suggest", "type": "suggest", "id": "crew", "options": rDCrew },
      ]} />

    <h2>Suggest</h2>
    <Suggest options={[ "Lister", "Rimmer", "Cat", "Kryten", "Holly" ]} />

    <h2>Ratings</h2>
    <Rating />
    <Rating defaultValue={3} />
    <Rating max={3} />
    <Rating readonly={true} />

    <h2>Form Input</h2>
    <FormInput />
    <FormInput defaultValue="this is the default" />
    <FormInput type="year" />
    <FormInput type="rating" defaultValue={4} />
    <FormInput type="suggest" options={[ "worm", "snake", "eel" ]} defaultValue="snake" />
    <FormInput type="text" />

  </div>,
  document.getElementById("demo-app")
);
