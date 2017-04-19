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
      'btn',
      (mode.id === activeMode ? 'btn--isActive' : ''),
    ];
    return (
      <button className={classes.join(' ')} onClick={this.callback(mode.id)}>
        {mode.name}
      </button>
    );
  }
}

export default ModeItem;
