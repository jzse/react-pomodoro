import React from 'react';

class ModeItem extends React.Component {
  callback(id) {
    return () => {
      this.props.onModeChange(id);
    };
  }
  render() {
    const { mode, activeMode } = this.props;
    const classes = [
      'ModeItem',
      (mode.id === activeMode ? 'ModeItem--active' : ''),
    ].join(' ');
    return (
      <button className={classes} onClick={this.callback(mode.id)}>
        {mode.name}
      </button>
    );
  }
}

export default ModeItem;
