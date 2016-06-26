/* global flatpickr */

import React, { PropTypes } from 'react';

class DateTimeSelector extends React.Component {
  componentDidMount() {
    const { fieldName, onChange } = this.props;
    flatpickr(`#${fieldName}`, {
      enableTime: true,
      dateFormat: 'd/m/Y',
      onChange(date) {
        onChange({
          target: {
            name: fieldName,
            value: date,
          },
        });
      },
    });
  }
  render() {
    return (
      <div className="ui fluid input">
        <label htmlFor="datetime"></label>
        <input type="datetime" id={this.props.fieldName} name={this.props.fieldName} placeholder="Fecha y Hora" />
      </div>
    );
  }
}

DateTimeSelector.propTypes = {
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateTimeSelector;
