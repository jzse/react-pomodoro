import React from 'react';

function Clock({ minutes, seconds, remaining }) {
  // Flash separator inbetween every elapsed second.
  const clockFlash = (remaining % 1000 !== 0) && true;
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
