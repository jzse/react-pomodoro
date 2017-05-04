import React from 'react';
import Title from '../Title';
import Clock from '../Clock';
import Countdown from '../Countdown';
import Alarm from '../Alarm';
import ModeList from '../ModeList';
import Controls from '../Controls';
import HistoryList from '../HistoryList';
// import TimeForm from '../TimeForm';

import DEFAULTS from '../../constants';
import toPad from '../../utils/toPad';
import extractTime from '../../utils/extractTime';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      delay: 1000,
      initial: DEFAULTS.modes.pomodoro.initial,
      remaining: DEFAULTS.modes.pomodoro.initial,
      isEnabled: false,
      isAlarmed: false,
      volume: 0.2,
      modes: DEFAULTS.modes,
      activeMode: DEFAULTS.modes.pomodoro.id,
      history: {},
      sequenceStep: 0,
    };

    this.historyId = 0;
    this.handleTick = this.handleTick.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    // this.handleTimeFormChange = this.handleTimeFormChange.bind(this);
    // this.handleVolumeChange = this.handleVolumeChange.bind(this);
  }

  addHistory(existingHistory) {
    this.historyId += 1;
    const historyId = this.historyId;
    const mergedHistory = {
      ...existingHistory,
      [historyId]: {
        id: historyId,
        name: this.state.modes[this.state.activeMode].name,
        initial: this.state.modes[this.state.activeMode].initial,
        start: this.historyStart,
        end: new Date(),
      },
    };
    return mergedHistory;
  }

  handleTick(remaining) {
    this.setState({
      remaining,
    });
  }

  handleComplete() {
    const finalSequenceStep = DEFAULTS.sequence.length - 1;
    this.setState({
      isEnabled: false,
      isAlarmed: true,
      history: {
        ...this.addHistory(this.state.history),
      },
      sequenceStep: this.state.activeMode === DEFAULTS.sequence[this.state.sequenceStep] &&
        this.state.sequenceStep < finalSequenceStep
        ? (this.state.sequenceStep += 1)
        : 0,
    });
  }

  handleModeChange(activeMode) {
    const { initial } = this.state.modes[activeMode];
    this.setState({
      activeMode,
      initial,
      remaining: initial,
      isEnabled: false,
      isAlarmed: false,
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
        this.handleCancelAlarm();
        break;
      default:
        throw new Error('Unknown status');
    }
  }

  handleCancelAlarm() {
    const nextActiveMode = DEFAULTS.sequence[this.state.sequenceStep];
    this.handleModeChange(nextActiveMode);
  }

  // handleTimeFormChange(newRemaining) {
  //   const activeMode = this.state.activeMode;
  //   const updatedModes = {
  //     ...this.state.modes,
  //     [activeMode]: {
  //       id: activeMode,
  //       name: this.state.modes[activeMode].name,
  //       initial: newRemaining,
  //     },
  //   };
  //   this.setState({
  //     initial: newRemaining,
  //     remaining: newRemaining,
  //     isEnabled: false,
  //     isAlarmed: false,
  //     modes: updatedModes,
  //   });
  // }

  // handleVolumeChange(event) {
  //   this.setState({
  //     volume: event.target.value,
  //   });
  // }

  render() {
    const {
      isEnabled,
      isAlarmed,
      volume,
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
        <div>
          <div className="Pomodoro">
            <Title {...{ title }} />

            <Countdown
              {...{ isEnabled, remaining, delay }}
              onTick={this.handleTick}
              onComplete={this.handleComplete}
            />

            <Alarm {...{ isAlarmed, volume }} />
            <Clock {...{ minutes, seconds, remaining, delay }} />

            {/* <TimeForm
              {...{ minutes, seconds }}
              onTimeFormChange={this.handleTimeFormChange}
            /> */}

            <ModeList {...{ modes, activeMode }} onModeChange={this.handleModeChange} />

            <Controls
              {...{ isEnabled, initial, remaining, isAlarmed }}
              onStatusChange={this.handleStatusChange}
            />
          </div>
          <div>
            <HistoryList {...{ history }} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
