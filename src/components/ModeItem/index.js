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
      (mode.id === activeMode ? 'ModeItem--isActive' : ''),
    ];
    return (
      <button className={classes.join(' ')} onClick={this.callback(mode.id)}>
        {mode.name}
      </button>
    );
  }
}

export default ModeItem;
