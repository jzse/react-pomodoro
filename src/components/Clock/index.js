import React from 'react';

function Clock({ minutes, seconds, clockFlash }) {
  const classClockFlash = [
    'Clock__flash',
    (clockFlash ? '' : 'Clock__flash--isFlash'),
  ].join(' ');
  return (
    <div className="Clock">
      {minutes}<span className={classClockFlash}>:</span>{seconds}
    </div>
  );
}

export default Clock;
