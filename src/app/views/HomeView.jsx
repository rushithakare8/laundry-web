import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentOrders as getCurrentOrdersFunc } from '../redux/reducers/orders';
import RadialProgress from '../components/RadialProgress';
import CurrentOrders from '../components/orders/CurrentOrders';

export const HomeView = ({ orders, user, getCurrentOrders }) => (
  <div className="container text-center">
    <div className="banner row align-middle Py(15px)">
      <div className="columns Ta(end)">Points to next reward: { user.pointsMissing }</div>
      <div className="columns">
        <RadialProgress progress={ user.pointsCompleted } />
      </div>
    </div>
    <CurrentOrders orders={ orders } getCurrentOrders={ getCurrentOrders } />
  </div>
);

HomeView.propTypes = {
  getCurrentOrders: PropTypes.func.isRequired,
  orders: PropTypes.array,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  user: state.user,
});

export default connect((mapStateToProps), {
  getCurrentOrders: getCurrentOrdersFunc,
})(HomeView);
