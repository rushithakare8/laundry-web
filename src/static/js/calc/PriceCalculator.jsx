/* global $ */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Option from './components/Option';
import AmountSlider from './components/AmountSlider';

class PriceCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.onAmountChange = this.onAmountChange.bind(this);
  }
  componentDidMount() {}
  onAmountChange(val) {
    console.log(val);
  }
  render() {
    return (
      <div className="row align-center">
        <div className="row column small-12 medium-6 My(28px)">
          <Option option="laundry" />
          <Option option="iron" />
          <Option option="dry" />
          <AmountSlider min={1} max={20} onChange={this.onAmountChange} />
        </div>
      </div>
    );
  }
}

PriceCalculator.propTypes = {
  cart: PropTypes.object,
  services: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  services: state.services,
});

export default connect((mapStateToProps), {
})(PriceCalculator);
