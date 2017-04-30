import React from 'react';
import extractTime from '../../utils/extractTime';
import toPad from '../../utils/toPad';

function HistoryList({ history }) {
  return (
    <ol reversed className="HistoryList">
      {Object.values(history).reverse().map(item => <HistoryItem key={item.id} {...item} />)}
    </ol>
  );
}

function HistoryItem({ name, initial, end }) {
  const [minutes, seconds] = Object.values(extractTime(initial)).map(num =>
    toPad(num),
  );
  const formatInitial = `${minutes}:${seconds}`;
  return (
    <li className="HistoryItem" title={formatInitial}>
      <span className="HistoryItem--detail">
        {end.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span className="HistoryItem--name">{name}</span>
    </li>
  );
}

export default HistoryList;
