/* global $ */
import React, { PropTypes } from 'react';
import Rheostat from 'rheostat';
import SliderPit from './SliderPit';

class AmountSlider extends React.Component {
  static getPoints() {
    const points = [];
    for (let i = 0; i < 7; i += 1) {
      points.push(i * 2);
    }
    return points;
  }
  constructor(props) {
    super(props);
    this.onSpecChange = this.onSpecChange.bind(this);
    this.onAmountChange = this.onAmountChange.bind(this);
    this.getIncrement = this.getIncrement.bind(this);
  }
  onSpecChange(e) {
    const val = e.target.value;
    const { spec } = this.props;
    this.props.onSpecChange(val, spec.idSpecs);
  }
  onAmountChange(e) {
    const val = e.values[0];
    const { spec } = this.props;
    this.props.onAmountChange(val, spec.idSpecs);
  }
  getIncrement() {
    const { spec } = this.props;
    const options = spec.options && spec.options[spec.idSpecs];
    const specPrice = (spec.option && spec.option.specPrice) || (options[0] && options[0].specPrice) || 0;
    const percent = (spec.option && spec.option.serviceIncrement) || (options[0] && options[0].serviceIncrement) || 0;
    const price = spec.price + specPrice;
    return {
      percent,
      price,
    };
  }
  render() {
    const { spec, subtotal } = this.props;
    const { optional, name } = spec;
    const max = spec.max_qty;
    const min = optional === 0 ? 1 : 0;
    const options = spec.options && spec.options[spec.idSpecs];
    const amount = spec.amount || min;
    const option = spec.option || options[0];
    const increments = this.getIncrement();
    let total = (increments.price * amount);
    const inc = increments.percent ? amount * (increments.percent / 100) : 0;
    if (inc > 0) {
      total = inc * subtotal;
    }
    return (
      <div className="column small-12 My(7px)">
        <div className="row align-center">
          <div className="rheostat-title Ta(c)">
            <div className="D(ib)">
              <h3>{name.toUpperCase()}</h3>
            </div>
            {options && options.length > 0 ? (
              <div className="D(ib) Mx(7px)">
                <select onChange={this.onSpecChange} value={option.key}>
                  {options.map(opt => (<option key={`${opt.key}-${spec.idSpecs}`} value={opt.key}>{opt.value}</option>))}
                </select>
              </div>
            ) : null}
            <div className="D(ib) Va(m)">
              {total > 0 ? (
                <div className="rheostat-indicator">{amount}</div>
              ) : null}
            </div>
          </div>
        </div>
        {total > 0 ? (
          <Rheostat min={min} max={max} values={[min]} pitPoints={AmountSlider.getPoints()} pitComponent={SliderPit} onValuesUpdated={this.onAmountChange} />
        ) : null}
        <h5 className="subheader">Agrega ${Math.round(total * 100) / 100}</h5>
        <hr />
      </div>
    );
  }
}

AmountSlider.propTypes = {
  spec: PropTypes.object.isRequired,
  subtotal: PropTypes.number.isRequired,
  onSpecChange: PropTypes.func.isRequired,
  onAmountChange: PropTypes.func.isRequired,
};

export default AmountSlider;
