import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getServiceTypes as getServiceTypesFunc } from '../redux/reducers/orders';
import NewOrderAddress from '../containers/NewOrderAddress';
import NewOrderServices from '../containers/NewOrderServices';
import NewOrderPayments from '../containers/NewOrderPayments';
import NewOrderSummary from '../containers/NewOrderSummary';

class NewOrderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { openedMenu: false };
  }
  componentDidMount() {
  }
  render() {
    console.log(this.props.user);
    return (
      <div className="ui container">
        <NewOrderSummary />
        <NewOrderAddress user={ this.props.user } />
        <NewOrderServices serviceTypes={ this.props.serviceTypes } />
        <NewOrderPayments user={ this.props.user } />
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
  getServiceTypes: getServiceTypesFunc,
})(NewOrderView);
