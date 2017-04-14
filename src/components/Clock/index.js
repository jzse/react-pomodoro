import React from 'react';

import toPad from '../../utils/toPad';

function Clock(props) {
  const isHoursHidden = props.isHoursHidden;
  const [hours, minutes, seconds] = [props.hours, props.minutes, props.seconds].map(
    num => toPad(num),
  );
  return (
    <h1 className="Clock">
      {!isHoursHidden ? `${hours}:` : ''}
      {minutes}:
      {seconds}
    </h1>
  );
}

export default Clock;
