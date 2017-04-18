import React from 'react';
import PropTypes from 'prop-types';

class TimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    // - positive integers only
    // - max value 59
    const value = event.target.value.match(/^\d+$/) && event.target.value < 60
      ? event.target.value
      : 0;
    const merged = {
      ...{
        minutes: this.props.minutes,
        seconds: this.props.seconds,
      },
      ...{ [event.target.name]: value },
    };
    this.props.onTimeFormChange(merged.minutes * 60 * 1000 + merged.seconds * 1000);
  }

  render() {
    const { minutes, seconds } = this.props;
    return (
      <div className="TimeForm" onChange={this.handleFormChange}>
        {Object.keys({ minutes, seconds }).map(item => (
          <div key={item}>
            <label className="visuallyhidden" htmlFor={item}>
              {item}
            </label>
            <input type="text" id={item} name={item} value={this.props[item]} />
          </div>
        ))}
      </div>
    );
  }
}

TimeForm.propTypes = {
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
  onTimeFormChange: PropTypes.func.isRequired,
};

export default TimeForm;
