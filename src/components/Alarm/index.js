import React from 'react';
import Clock from '../Clock';

class Alarm extends React.Component {
  componentDidMount() {
    this.audio = new Audio('alarm.mp3');
    this.audio.loop = true;
    this.audio.volume = 0.2;
    this.audio.play();
    // console.timeEnd('elapsed');
  }
  componentWillUnmount() {
    this.audio.pause();
  }

  render() {
    return <Clock minutes={'00'} seconds={'00'} isHoursHidden />;
  }
}

export default Alarm;
