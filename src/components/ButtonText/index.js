import React from 'react';
import './index.css';

function ButtonText(props) {
  const className = ['ButtonText', props.className].join(' ');
  const newProps = { ...props, className };
  return (
    <button {...newProps}>
      {props.children}
    </button>
  );
}

export default ButtonText;
