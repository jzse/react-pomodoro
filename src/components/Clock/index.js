import React from 'react';

function Clock({ minutes, seconds }) {
  return (
    <div>
      {minutes}:
      {seconds}
    </div>
  );
}

export default Clock;
