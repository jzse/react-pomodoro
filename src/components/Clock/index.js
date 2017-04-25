import React from 'react';

function Clock({ minutes, seconds, remaining, delay }) {
  // Flash the separator to indicate the delay value to user.
  const clockFlash = ((remaining / delay) % 2);
  const classClockFlash = [
    'Clock__separator',
    (clockFlash ? '' : 'Clock__separator--isFlash'),
  ].join(' ');
  return (
    <div className="Clock">
      {minutes}<span className={classClockFlash}>:</span>{seconds}
    </div>
  );
}

export default Clock;
