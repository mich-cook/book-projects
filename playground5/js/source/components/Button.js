// @flow
import React from 'react';

type Props = {
  "href": ?string
/*  , "className": ?string */
};

const Button = (props: Props): Object => {
  if (props.href !== undefined) {
    return <a {...props} className="Button" />;
  }

  // they are trying to set classes like this:
  // const cssclasses = classNames('Button', props.className);
  // < ... className={cssclasses} />;

  return <button {...props} className="Button" />;

}

export default Button;
