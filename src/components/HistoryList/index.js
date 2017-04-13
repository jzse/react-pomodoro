import React from 'react';

function HistoryList(props) {
  const { history } = props;
  return (
    <ol>
      {history.map(item => <HistoryListItem key={item.id} {...item} />)}
    </ol>
  );
}

function HistoryListItem(props) {
  const { name } = props;
  return (
    <li>
      {name}
    </li>
  );
}

export default HistoryList;
