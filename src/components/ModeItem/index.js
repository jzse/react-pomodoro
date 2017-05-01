import React from 'react';
import ButtonText from '../ButtonText';
import './index.css';

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
      <ButtonText className={classes} onClick={this.callback(mode.id)}>
        {mode.name}
      </ButtonText>
    );
  }
}

export default ModeItem;
