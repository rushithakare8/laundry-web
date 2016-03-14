import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { getCurrentOrders as getCurrentOrdersFunc } from '../../redux/reducers/orders';
import RadialProgress from '../../components/RadialProgress';

export const HomeView = ({ orders, user, getCurrentOrders }) => {
  const orderChilds = orders ? orders.valueSeq().map((order, i) => (
    <div key={i}>{ order.city }</div>
  )) : null;
  return (
    <div className="container text-center">
      <div className="banner row align-middle Py(15px)">
        <div className="columns Ta(end)">Points to next reward: { user.pointsMissing }</div>
        <div className="columns">
          <RadialProgress progress={ user.pointsCompleted } />
        </div>
      </div>
      { orderChilds }
      <button className="button" onClick={ getCurrentOrders }>Get Current Orders</button>
    </div>
  );
};

HomeView.propTypes = {
  getCurrentOrders: PropTypes.func.isRequired,
  orders: PropTypes.object,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  orders: state.orders,
  user: state.user,
});

export default connect((mapStateToProps), {
  getCurrentOrders: getCurrentOrdersFunc,
})(HomeView);
