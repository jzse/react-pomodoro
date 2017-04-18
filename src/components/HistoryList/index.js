import React from 'react';
import extractTime from '../../utils/extractTime';
import toPad from '../../utils/toPad';

function HistoryList({ history }) {
  return (
    <ol reversed>
      {Object.values(history).reverse().map(item => <HistoryListItem key={item.id} {...item} />)}
    </ol>
  );
}

function HistoryListItem({ name, initial, end }) {
  const [minutes, seconds] = Object.values(extractTime(initial)).map(num =>
    toPad(num),
  );
  const formatInitial = `${minutes}:${seconds}`;
  return (
    <li>
      <strong>{name}</strong>
      <div>
        {' '}
        <small>
          {end.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })} [{formatInitial}]
        </small>
      </div>
    </li>
  );
}

export default HistoryList;
