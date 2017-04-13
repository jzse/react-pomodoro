import React from 'react';
import Clock from './components/Clock';
import Counter from './components/Counter';
import Alarm from './components/Alarm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      initial: 5,
      remaining: 5,
      enabled: false,
      alarmed: false,
    };
    this.handleInterval = this.handleInterval.bind(this);
    this.handleStartStopClick = this.handleStartStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleAlarmClick = this.handleAlarmClick.bind(this);
  }

  handleInterval() {
    // State object to setState (and render) only once per interval.
    let newState = {};
    if (this.state.enabled) {
      newState = {
        ...newState,
        remaining: this.state.remaining - 1,
      };
    }
    // Trigger alert on the final interval.
    if (this.state.remaining === 1) {
      newState = {
        ...newState,
        enabled: false,
        alarmed: true,
      };
    }
    this.setState(newState);
  }

  handleStartStopClick() {
    this.setState({
      enabled: !this.state.enabled,
    });
  }

  handleResetClick() {
    this.setState({
      enabled: false,
      remaining: this.state.initial,
      alarmed: false,
    });
  }

  handleAlarmClick() {
    this.setState({
      alarmed: !this.state.alarmed,
      remaining: this.state.initial,
    });
  }

  extractClock() {
    return {
      minutes: Math.floor(this.state.remaining % 3600 / 60),
      seconds: Math.floor(this.state.remaining % 3600 % 60),
    };
  }

  render() {
    const { enabled, alarmed, initial, remaining } = this.state;
    const isResetDisabled = remaining === initial;
    return (
      <div className="App">
        <Counter {...{ enabled }} callback={this.handleInterval} />

        {alarmed ? <Alarm /> : <Clock {...this.extractClock()} isHoursHidden />}

        {remaining !== 0 &&
          <button onClick={this.handleStartStopClick}>{!enabled ? 'Start' : 'Stop'}</button>}

        {alarmed && remaining === 0 && <button onClick={this.handleAlarmClick}>OK</button>}

        <button onClick={this.handleResetClick} disabled={isResetDisabled}>Reset</button>
      </div>
    );
  }
}

export default App;
