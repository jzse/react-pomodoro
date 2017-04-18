import React from 'react';

function HistoryList(props) {
  const { history } = props;
  return (
    <ol reversed>
      {Object.values(history).reverse().map(item => <HistoryListItem key={item.id} {...item} />)}
    </ol>
  );
}

function HistoryListItem(props) {
  const { name, end } = props;
  return (
    <li>
      <strong>{name}</strong>
      <div>
        {' '}
        <small>
          {end.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' })}
        </small>
      </div>
    </li>
  );
}

export default HistoryList;
