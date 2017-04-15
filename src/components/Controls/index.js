import React from 'react';

class Controls extends React.Component {
  callback(newStatus) {
    return () => this.props.onStatusChange(newStatus);
  }
  render() {
    const { enabled, initial, remaining, isAlarmed } = this.props;
    const isResetDisabled = remaining === initial;
    return (
      <div>
        {!enabled && remaining !== 0 && <button onClick={this.callback('start')}>Start</button>}
        {enabled && <button onClick={this.callback('stop')}>Stop</button>}

        {isAlarmed && remaining === 0 && <button onClick={this.callback('alarm')}>OK</button>}

        <button onClick={this.callback('reset')} disabled={isResetDisabled}>
          Reset
        </button>
      </div>
    );
  }
}

export default Controls;
