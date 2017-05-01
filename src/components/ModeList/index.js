import React from 'react';
import ModeItem from '../ModeItem';
import './index.css';

function ModeList({ modes, activeMode, onModeChange }) {
  return (
    <div className="ModeList">
      {Object.values(modes).map(mode => (
        <ModeItem key={mode.id} {...{ activeMode, onModeChange }} mode={mode} />
      ))}
    </div>
  );
}

export default ModeList;
