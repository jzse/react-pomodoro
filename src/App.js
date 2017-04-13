import React from 'react';
import Clock from './components/Clock';
import Counter from './components/Counter';
import Alarm from './components/Alarm';
import HistoryList from './components/HistoryList';

const MODES_DEFAULT = [
  {
    id: 'testing',
    name: 'Testing',
    initial: 2,
  },
  {
    id: 'pomodoro',
    name: 'Pomodoro',
    initial: 25,
  },
  {
    id: 'break_short',
    name: 'Short break',
    initial: 5,
  },
  {
    id: 'break_long',
    name: 'Long break',
    initial: 15,
  },
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      initial: MODES_DEFAULT[0].initial,
      remaining: MODES_DEFAULT[0].initial,
      enabled: false,
      modes: MODES_DEFAULT,
      activeMode: MODES_DEFAULT[0].id,
      history: [],
    };
    this.historyId = 0;
    this.handleInterval = this.handleInterval.bind(this);
    this.handleStartStopClick = this.handleStartStopClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.handleAlarmClick = this.handleAlarmClick.bind(this);
  }

  handleInterval() {
    // State object to setState (and render) only once per interval.
    let newState = {};

    // Tick the clock.
    if (this.state.enabled) {
      newState = {
        ...newState,
        remaining: this.state.remaining - 1,
      };
    }

    // Trigger alarm and record history on the final interval.
    if (this.state.remaining === 1) {
      newState = {
        ...newState,
        enabled: false,
        history: [
          ...this.state.history,
          {
            id: this.historyId += 1,
            name: this.state.modes.find(mode => mode.id === this.state.activeMode).name,
          },
        ],
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
    });
  }

  handleAlarmClick() {
    this.setState({
      remaining: this.state.initial,
    });
  }

  handleModeChange(activeMode) {
    const { initial } = this.state.modes.find(mode => mode.id === activeMode);
    this.setState({
      activeMode,
      initial,
      remaining: initial,
      enabled: false,
    });
  }

  extractClock() {
    return {
      minutes: Math.floor(this.state.remaining % 3600 / 60),
      seconds: Math.floor(this.state.remaining % 3600 % 60),
    };
  }

  render() {
    const { enabled, initial, remaining, history } = this.state;
    const isResetDisabled = remaining === initial;
    const isAlarmed = remaining === 0 && !enabled;
    return (
      <div className="App">
        <Counter {...{ enabled }} callback={this.handleInterval} />

        {isAlarmed ? <Alarm /> : <Clock {...this.extractClock()} isHoursHidden />}

        <div>
          {this.state.modes.map(mode => (
            <label htmlFor={mode.id} key={mode.id}>
              <input
                type="radio"
                id={mode.id}
                value={mode.id}
                checked={mode.id === this.state.activeMode}
                onChange={() => this.handleModeChange(mode.id, event)}
              />
              {mode.name}
            </label>
          ))}
        </div>

        {remaining !== 0 &&
          <button onClick={this.handleStartStopClick}>{!enabled ? 'Start' : 'Stop'}</button>}

        {isAlarmed && remaining === 0 && <button onClick={this.handleAlarmClick}>OK</button>}

        <button onClick={this.handleResetClick} disabled={isResetDisabled}>Reset</button>

        <HistoryList {...{ history }} />
      </div>
    );
  }
}

export default App;
