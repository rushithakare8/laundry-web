import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NewOrderAddress from '../containers/NewOrderAddress';
import NewOrderServices from '../containers/NewOrderServices';
import NewOrderPayments from '../containers/NewOrderPayments';
import NewOrderSummary from '../containers/NewOrderSummary';
import NewOrderComments from '../containers/NewOrderComments';

class NewOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openedMenu: false };
  }
  componentDidMount() {
  }
  render() {
    return (
      <div className="ui container">
        <NewOrderSummary />
        <NewOrderAddress user={ this.props.user } />
        <NewOrderServices serviceTypes={ this.props.serviceTypes } />
        <NewOrderPayments user={ this.props.user } />
        <NewOrderComments />
        <div className="ui column row">
          <button className="fluid ui icon button">
            <i className="fa fa-shopping-cart"></i>
            <span className="Mstart(10px)">Checkout</span>
          </button>
        </div>
      </div>
    );
  }
}

NewOrderView.propTypes = {
  user: PropTypes.object.isRequired,
  serviceTypes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  serviceTypes: state.serviceTypes,
});

export default connect((mapStateToProps), {
})(NewOrderView);
