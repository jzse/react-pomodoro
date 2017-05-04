import React from 'react';
import extractTime from '../../utils/extractTime';
import toPad from '../../utils/toPad';
import './index.css';

function HistoryList({ history }) {
  const maxHistory = 11;
  const recentHistory = (obj = history, n = maxHistory) =>
    Object.keys(obj)
      .sort((a, b) => a - b)
      .reverse()
      .slice(0, n)
      .reduce((accumulator, currentValue, currentIndex) => {
        accumulator[currentValue] = obj[currentValue];
        accumulator[currentValue].displayIntensity = (maxHistory - currentIndex) / maxHistory;
        return accumulator;
      }, {});
  return (
    <ol reversed className="HistoryList">
      {Object.values(recentHistory())
        .reverse()
        .map(item => <HistoryItem key={item.id} {...item} />)}
    </ol>
  );
}

function HistoryItem({ name, initial, end, displayIntensity }) {
  const [minutes, seconds] = Object.values(extractTime(initial)).map(num => toPad(num));
  const formatInitial = `${minutes}:${seconds}`;
  const styleHistoryItem = {
    opacity: displayIntensity,
  };
  const classNameHistoryItem = ['HistoryItem'].join(' ');
  return (
    <li style={styleHistoryItem} className={classNameHistoryItem} title={`${formatInitial} - ${end}`}>
      <span className="HistoryItem__detail">
        {end.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}
      </span>
      <span className="HistoryItem__name">{name}</span>
    </li>
  );
}

export default HistoryList;
