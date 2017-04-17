import React from 'react';
import Title from './components/Title';
import Clock from './components/Clock';
import Countdown from './components/Countdown';
import Alarm from './components/Alarm';
import ModeList from './components/ModeList';
import Controls from './components/Controls';
import HistoryList from './components/HistoryList';
import TimeForm from './components/TimeForm';

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
      isEnabled: false,
      modes: MODES_DEFAULT,
      activeMode: MODES_DEFAULT.pomodoro.id,
      history: {},
    };
    this.historyId = 0;
    this.handleTick = this.handleTick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleTimeFormChange = this.handleTimeFormChange.bind(this);
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
          initial: this.state.modes[this.state.activeMode].initial,
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
      isEnabled: false,
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
      isEnabled: false,
    });
  }

  handleStatusChange(newStatus) {
    switch (newStatus) {
      case 'start':
        this.setState({
          isEnabled: true,
        });
        this.historyStart = new Date();
        // console.time('elapsed');
        break;
      case 'stop':
        this.setState({
          isEnabled: false,
        });
        break;
      case 'reset':
        this.setState({
          isEnabled: false,
          remaining: this.state.initial,
          isAlarmed: false,
        });
        break;
      case 'cancelAlarm':
        this.setState({
          remaining: this.state.initial,
          isAlarmed: false,
        });
        break;
      default:
        throw new Error('Unknown status');
    }
  }

  handleTimeFormChange(remaining) {
    this.setState({
      initial: remaining,
      remaining,
      isEnabled: false,
    });
  }

  render() {
    const {
      isEnabled,
      isAlarmed,
      delay,
      initial,
      remaining,
      modes,
      activeMode,
      history,
    } = this.state;
    const [minutes, seconds] = Object.values(extractTime(this.state.remaining)).map(num =>
      toPad(num),
    );
    const title = `${minutes}:${seconds} react-pomodoro`;
    return (
      <div className="App">
        <Title {...{ title }} />

        <Countdown
          {...{ isEnabled, remaining, delay }}
          onTick={this.handleTick}
          onComplete={this.handleComplete}
        />

        {isAlarmed ? <Alarm /> : <Clock {...{ minutes, seconds }} />}

        <TimeForm {...{ minutes, seconds }} onTimeFormChange={this.handleTimeFormChange} />

        <ModeList {...{ modes, activeMode }} onModeChange={this.handleModeChange} />

        <Controls
          {...{ isEnabled, initial, remaining, isAlarmed }}
          onStatusChange={this.handleStatusChange}
        />

        <HistoryList {...{ history }} />
      </div>
    );
  }
}

export default App;
