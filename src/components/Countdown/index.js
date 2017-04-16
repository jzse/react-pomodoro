import React from 'react';
import PropTypes from 'prop-types';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
    this.tick = this.tick.bind(this);
    this.callbackTick = this.callbackTick.bind(this);
    this.callbackComplete = this.callbackComplete.bind(this);
  }

  componentDidMount() {
    if (this.props.enabled) {
      this.start();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.enabled !== nextProps.enabled) {
      if (nextProps.enabled) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  callbackTick() {
    this.props.onTick(this.props.remaining);
  }

  callbackComplete() {
    this.props.onComplete();
  }

  start() {
    this.setState({
      timer: setInterval(this.tick, this.props.delay),
    });
  }

  tick() {
    if (this.props.onTick) {
      this.props.onTick(this.props.remaining - this.props.delay);
    }

    if (this.props.remaining < this.props.delay) {
      if (this.props.onComplete) {
        this.props.onComplete();
      }
    }
  }

  stop() {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
    });
  }

  render() {
    return false;
  }
}

Countdown.propTypes = {
  enabled: PropTypes.bool.isRequired,
  remaining: PropTypes.number.isRequired,
  delay: PropTypes.number.isRequired,
  onTick: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Countdown;
