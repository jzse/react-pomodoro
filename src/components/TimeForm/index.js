import React from 'react';
import PropTypes from 'prop-types';

class TimeForm extends React.Component {
  constructor(props) {
    super(props);
    this.patternPositiveInt = '^\\d+$';
    this.regexPositiveInt = new RegExp(this.patternPositiveInt);

    this.handleFormChange = this.handleFormChange.bind(this);
  }

  handleFormChange(event) {
    const value = event.target.value.match(this.regexPositiveInt) && event.target.value < 60
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
      <div onChange={this.handleFormChange}>
        {Object.keys({ minutes, seconds }).map(item => (
          <div key={item}>
            <label className="visuallyhidden" htmlFor={item}>
              {item}
            </label>
            <input type="tel" id={item} name={item} value={this.props[item]} />
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
