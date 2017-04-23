import React from 'react';

class Alarm extends React.Component {
  componentWillMount() {
    this.audio = new Audio('alarm.mp3');
    this.audio.loop = true;
    this.audio.volume = this.props.volume;
  }

  componentWillReceiveProps(nextProps) {
    if (this.audio) {
      this.audio.volume = nextProps.volume;
    }
  }

  componentWillUnmount() {
    this.audio.pause();
    this.audio = null;
  }

  render() {
    if (this.audio && !this.props.isAlarmed) {
      this.audio.pause();
      return false;
    }
    this.audio.play();
    return false;
  }
}

export default Alarm;
