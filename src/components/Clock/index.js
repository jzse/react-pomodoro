import React from 'react';

function Clock(props) {
  const isHoursHidden = props.isHoursHidden;
  const [hours, minutes, seconds] = [props.hours, props.minutes, props.seconds].map(
    num => (num < 10 ? `0${num}` : num),
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
