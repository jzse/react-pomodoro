import React from 'react';
import ButtonText from '../ButtonText';
import './index.css';

class Controls extends React.Component {
  callback(newStatus) {
    return () => this.props.onStatusChange(newStatus);
  }
  render() {
    const { isEnabled, initial, remaining, isAlarmed } = this.props;
    return (
      <div className="Controls">
        {!isEnabled &&
          remaining <= initial &&
          !isAlarmed &&
          <ButtonText
            onClick={this.callback('start')}
            disabled={initial === 0}
            className="Controls-Button Controls-Button--start"
          >
            Start
          </ButtonText>}
        {isEnabled &&
          <ButtonText onClick={this.callback('stop')} className="Controls-Button Controls-Button--stop">
            Stop
          </ButtonText>}

        {isAlarmed &&
          remaining === 0 &&
          <ButtonText onClick={this.callback('cancelAlarm')} className="Controls-Button Controls-Button--ok">
            OK
          </ButtonText>}

        <ButtonText
          onClick={this.callback('reset')}
          disabled={remaining === initial}
          className="Controls-Button Controls-Button--reset"
        >
          Reset
        </ButtonText>
      </div>
    );
  }
}

export default Controls;
