import React from 'react';

function Clock({ minutes, seconds }) {
  return (
    <div className="Clock">
      {minutes}:
      {seconds}
    </div>
  );
}

export default Clock;
