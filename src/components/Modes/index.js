import React from 'react';

class Modes extends React.Component {
  callback(id) {
    return () => {
      this.props.onModeChange(id);
    };
  }
  render() {
    const { modes, activeMode } = this.props;
    return (
      <div>
        {Object.values(modes).map(({ id, name }) => (
          <label htmlFor={id} key={id}>
            <input
              type="radio"
              id={id}
              value={id}
              checked={id === activeMode}
              onChange={this.callback(id)}
            />
            {name}
          </label>
        ))}
      </div>
    );
  }
}

export default Modes;
