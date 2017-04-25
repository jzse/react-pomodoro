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
    // Restart the audio when the alarm is triggered again.
    if (this.props.isAlarmed && !nextProps.isAlarmed) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.isAlarmed !== this.props.isAlarmed);
  }

  componentWillUnmount() {
    this.audio.pause();
    this.audio = null;
  }

  render() {
    if (this.props.isAlarmed) {
      this.audio.play();
    }
    return false;
  }
}

export default Alarm;
