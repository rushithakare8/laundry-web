/* global $ */
import React, { PropTypes } from 'react';
import Rheostat from 'rheostat';
import SliderPit from './SliderPit';

class AmountSlider extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getPoints = this.getPoints.bind(this);
  }
  componentDidMount() {}
  onChange(e) {
    const val = e.values[0];
    this.props.onChange(val);
  }
  getPoints() {
    const points = [];
    for (let i = 0; i < 10; i++) {
      points.push(i * 2);
    }
    return points;
  }
  render() {
    const { min, max } = this.props;
    return (
      <div className="column small-12 My(28px)">
        <div className="row align-justify">
          <div className="rheostat-indicator">{min}</div>
          <div className="rheostat-indicator Mend(-18px)">{max}</div>
        </div>
        <Rheostat min={min} max={max} values={[min]} pitPoints={this.getPoints()} pitComponent={SliderPit} onChange={this.onChange} />
      </div>
    );
  }
}

AmountSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default AmountSlider;
