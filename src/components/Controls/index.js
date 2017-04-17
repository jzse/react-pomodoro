import React from 'react';

class Controls extends React.Component {
  callback(newStatus) {
    return () => this.props.onStatusChange(newStatus);
  }
  render() {
    const { isEnabled, initial, remaining, isAlarmed } = this.props;
    return (
      <div>
        {!isEnabled &&
          remaining !== 0 &&
          <button onClick={this.callback('start')} disabled={initial === 0}>Start</button>}
        {isEnabled && <button onClick={this.callback('stop')}>Stop</button>}

        {isAlarmed && remaining === 0 && <button onClick={this.callback('cancelAlarm')}>OK</button>}

        <button onClick={this.callback('reset')} disabled={remaining === initial}>
          Reset
        </button>
      </div>
    );
  }
}

export default Controls;
