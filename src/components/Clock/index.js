import React from 'react';

function Clock({ minutes, seconds }) {
  const classClockFlash = [
    'Clock__separator',
  ].join(' ');
  return (
    <div className="Clock">
      {minutes}<span className={classClockFlash}>:</span>{seconds}
    </div>
  );
}

export default Clock;
