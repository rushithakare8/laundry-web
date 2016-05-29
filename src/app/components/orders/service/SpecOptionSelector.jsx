/* global $*/

import React, { PropTypes } from 'react';

class SpecOptionSelector extends React.Component {
  componentDidMount() {
    const { idSpec, specOptions } = this.props;
    const dropdownElem = $(`#specOptions${idSpec}`);
    dropdownElem.dropdown({
      onChange: (value) => {
        this.props.onChange(value);
      },
    });
    dropdownElem.dropdown('set selected', specOptions[0].value);
  }
  render() {
    const { idSpec, specOptions } = this.props;
    return (
      <section>
        <div id={`specOptions${idSpec}`} className="ui fluid selection dropdown">
          <input type="hidden" name={`specOptions${idSpec}`} />
          <div className="default text">Option</div>
          <i className="dropdown icon"></i>
          <div className="menu">
            {specOptions.map((opt, idx) => (<div key={`SPCO${idSpec}${idx}`} className="item" data-value={opt.value} >
              <div>{opt.value}</div>
            </div>))}
          </div>
        </div>
      </section>
    );
  }
}

SpecOptionSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  specOptions: PropTypes.array.isRequired,
  idSpec: PropTypes.number.isRequired,
};

export default SpecOptionSelector;
