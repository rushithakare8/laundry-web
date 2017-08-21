/* global $*/
import React from 'react';
import PropTypes from 'prop-types';

class SpecOptionSelector extends React.Component {
  componentDidMount() {
    const { idSpecs, specOptions } = this.props;
    const dropdownElem = $(`#specOptions${idSpecs}`);
    dropdownElem.dropdown({
      onChange: (value) => {
        const selected = specOptions.filter(opt => opt.value === value)[0];
        this.props.onChange(selected);
      },
    });
    dropdownElem.dropdown('set selected', specOptions.filter(opt => opt.serviceIncrement === 0)[0].value);
  }
  render() {
    const { idSpecs, specOptions } = this.props;
    return (
      <section>
        <div id={`specOptions${idSpecs}`} className="ui fluid selection dropdown">
          <input type="hidden" name={`specOptions${idSpecs}`} />
          <div className="default text">Opciones</div>
          <i className="dropdown icon" />
          <div className="menu">
            {specOptions.map((opt, idx) => (
              <div key={`SPCO${idSpecs}${idx}`} className="item" data-value={opt.value} >
                <div>{opt.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

SpecOptionSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  specOptions: PropTypes.array.isRequired,
  idSpecs: PropTypes.number.isRequired,
};

export default SpecOptionSelector;
