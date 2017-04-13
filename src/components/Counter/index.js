import React from 'react';

class Counter extends React.Component {
  constructor() {
    super();
    this.callback = this.callback.bind(this);
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

  callback() {
    if (this.timerID) {
      this.props.callback();
    }
  }

  start() {
    this.stop();
    this.timerID = setInterval(this.callback, 1000);
  }

  stop() {
    clearInterval(this.timerID);
  }

  render() {
    return false;
  }
}

export default Counter;
