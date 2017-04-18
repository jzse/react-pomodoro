import React from 'react';

class ModeItem extends React.Component {
  callback(id) {
    return () => {
      this.props.onModeChange(id);
    };
  }
  render() {
    const { mode, activeMode } = this.props;
    return (
      <label htmlFor={mode.id}>
        <input
          type="radio"
          id={mode.id}
          value={mode.id}
          checked={mode.id === activeMode}
          onChange={this.callback(mode.id)}
        />
        {mode.name}
      </label>
    );
  }
}

export default ModeItem;
