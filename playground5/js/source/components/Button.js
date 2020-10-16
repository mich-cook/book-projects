import React from 'react';

function Button(props) {
  if (props.href !== undefined) {
    return <a {...props} className="Button" />;
  }

  // they are trying to set classes like this:
  // const cssclasses = classNames('Button', props.className);
  // < ... className={cssclasses} />;

  return <button {...props} className="Button" />;

}

export default Button;
