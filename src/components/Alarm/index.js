import React from 'react';
import Clock from '../Clock';

class Alarm extends React.Component {
  constructor(props) {
    super(props);
    this.audio = new Audio('alarm.mp3');
    this.audio.loop = true;
    this.audio.play();
  }

  componentWillUnmount() {
    this.audio.pause();
  }

  render() {
    return <Clock minutes={0} seconds={0} isHoursHidden />;
  }
}

export default Alarm;
