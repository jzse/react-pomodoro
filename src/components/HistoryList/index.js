import React from 'react';

function HistoryList(props) {
  const { history } = props;
  return (
    <ol>
      {Object.values(history).map(({ id, name }) => <HistoryListItem key={id} {...{ id, name }} />)}
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
