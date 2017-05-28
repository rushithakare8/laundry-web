/* global flatpickr */
import React from 'react';
import PropTypes from 'prop-types';

class DateTimeSelector extends React.Component {
  componentDidMount() {
    const { fieldName, isPickup, onChange } = this.props;
    const localChange = date => onChange({
      target: {
        name: fieldName,
        value: date,
      },
    });
    const now = new Date();
    now.setHours(8, 30);
    if (!isPickup) {
      now.setHours(18, 0);
    }
    const defaultDate = now.toString();
    localChange(defaultDate);
    flatpickr(`#${fieldName}`, {
      enableTime: true,
      dateFormat: 'd/m/Y',
      defaultDate,
      onChange(date) {
        localChange(date);
      },
    });
  }
  render() {
    return (
      <div className="ui fluid input">
        <label htmlFor="datetime" />
        <input type="datetime" id={this.props.fieldName} name={this.props.fieldName} placeholder="Fecha y Hora" />
      </div>
    );
  }
}

DateTimeSelector.defaultProps = {
  isPickup: true,
};

DateTimeSelector.propTypes = {
  isPickup: PropTypes.bool.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateTimeSelector;
