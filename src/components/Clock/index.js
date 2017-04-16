import React from 'react';

function Clock({ isHoursHidden, hours, minutes, seconds }) {
  return (
    <h1 className="Clock">
      {!isHoursHidden ? `${hours}:` : ''}
      {minutes}:
      {seconds}
    </h1>
  );
}

export default Clock;
