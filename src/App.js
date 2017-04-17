import React from 'react';
import Title from './components/Title';
import Clock from './components/Clock';
import Countdown from './components/Countdown';
import Alarm from './components/Alarm';
import Modes from './components/Modes';
import Controls from './components/Controls';
import HistoryList from './components/HistoryList';

import MODES_DEFAULT from './constants';
import toPad from './utils/toPad';
import extractTime from './utils/extractTime';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      delay: 1000,
      initial: MODES_DEFAULT.pomodoro.initial,
      remaining: MODES_DEFAULT.pomodoro.initial,
      enabled: false,
      modes: MODES_DEFAULT,
      activeMode: MODES_DEFAULT.pomodoro.id,
      history: {},
    };
    this.historyId = 0;
    this.handleTick = this.handleTick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  setHistory(newState) {
    this.historyId += 1;
    const historyid = this.historyId;

    const history = {
      history: {
        ...this.state.history,
        [historyid]: {
          id: historyid,
          name: this.state.modes[this.state.activeMode].name,
          start: this.historyStart,
          end: new Date(),
        },
      },
    };

    return {
      ...newState,
      ...history,
    };
  }

  handleTick(remaining) {
    this.setState({
      remaining,
    });
  }

  handleComplete() {
    this.setState({
      enabled: false,
      isAlarmed: true,
      ...this.setHistory(this.state.history),
    });
  }

  handleModeChange(activeMode) {
    const { initial } = this.state.modes[activeMode];
    this.setState({
      activeMode,
      initial,
      remaining: initial,
      enabled: false,
    });
  }

  handleStatusChange(newStatus) {
    switch (newStatus) {
      case 'start':
        this.setState({
          enabled: true,
        });
        this.historyStart = new Date();
        // console.time('elapsed');
        break;
      case 'stop':
        this.setState({
          enabled: false,
        });
        break;
      case 'reset':
        this.setState({
          enabled: false,
          remaining: this.state.initial,
        });
        break;
      case 'alarm':
        this.setState({
          remaining: this.state.initial,
          isAlarmed: false,
        });
        break;
      default:
        throw new Error('Unknown status');
    }
  }

  render() {
    const { enabled, delay, initial, remaining, modes, activeMode, history } = this.state;
    const isAlarmed = remaining === 0 && !enabled;
    const [minutes, seconds] = Object.values(extractTime(this.state.remaining)).map(num =>
      toPad(num),
    );
    const title = `${minutes}:${seconds} react-pomodoro`;
    return (
      <div className="App">
        <Title {...{ title }} />

        <Countdown
          {...{ enabled, remaining, delay }}
          onTick={this.handleTick}
          onComplete={this.handleComplete}
        />

        {isAlarmed ? <Alarm /> : <Clock {...{ minutes, seconds }} isHoursHidden />}

        <Modes {...{ modes, activeMode }} onModeChange={this.handleModeChange} />

        <Controls
          {...{ enabled, initial, remaining, isAlarmed }}
          onStatusChange={this.handleStatusChange}
        />

        <HistoryList {...{ history }} />
      </div>
    );
  }
}

export default App;
