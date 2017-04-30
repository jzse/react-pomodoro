import React from 'react';

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
          <button
            onClick={this.callback('start')}
            disabled={initial === 0}
            className="Controls-Button Controls-Button--start"
          >
            Start
          </button>}
        {isEnabled &&
          <button onClick={this.callback('stop')} className="Controls-Button Controls-Button--stop">
            Stop
          </button>}

        {isAlarmed &&
          remaining === 0 &&
          <button onClick={this.callback('cancelAlarm')} className="Controls-Button Controls-Button--ok">
            OK
          </button>}

        <button
          onClick={this.callback('reset')}
          disabled={remaining === initial}
          className="Controls-Button Controls-Button--reset"
        >
          Reset
        </button>
      </div>
    );
  }
}

export default Controls;
