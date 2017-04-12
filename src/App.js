import React from 'react';
import Clock from './components/Clock';
import Counter from './components/Counter';
import Alarm from './components/Alarm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      interval: 1000,
      remaining: 5,
      enabled: true,
      alarmed: false,
    };
    this.handleInterval = this.handleInterval.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    this.setState({
      enabled: !this.state.enabled,
    });
  }

  handleResetClick() {
    this.setState({
      enabled: false,
      remaining: 5,
      alarmed: false,
    });
  }

  handleAlarmClick() {
    this.setState({
      alarmed: !this.state.alarmed,
      remaining: 5,
    });
  }

  extractClock() {
    return {
      minutes: Math.floor(this.state.remaining % 3600 / 60),
      seconds: Math.floor(this.state.remaining % 3600 % 60),
    };
  }

  render() {
    const { enabled, interval } = this.state;
    return (
      <div className="App">
        <Counter {...{ enabled, interval }} callback={this.handleInterval} />

        {this.state.alarmed ? <Alarm /> : <Clock {...this.extractClock()} isHoursHidden />}

        {this.state.remaining !== 0 &&
          <button onClick={this.handleClick}>{!this.state.enabled ? 'Start' : 'Stop'}</button>}

        {this.state.alarmed &&
          this.state.remaining === 0 &&
          <button onClick={this.handleAlarmClick}>OK</button>}

        <button onClick={this.handleResetClick}>Reset</button>
      </div>
    );
  }
}

export default App;
