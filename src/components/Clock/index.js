import React from 'react';

function Clock({ minutes, seconds }) {
  return (
    <h1 className="Clock">
      {minutes}:
      {seconds}
    </h1>
  );
}

export default Clock;
