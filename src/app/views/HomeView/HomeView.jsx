'use strict'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { getCurrentOrders } from '../../redux/reducers/orders'
import RadialProgress from '../../components/RadialProgress'

export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <div className='banner Py(15px)'>
          <RadialProgress progress={ this.props.user.pointsCompleted } />
          <div className='Mt(15px)'>Points to next reward: { this.props.user.pointsMissing }</div>
        </div>
        <button className='button' onClick={this.props.getCurrentOrders}>Get Current Orders</button>
      </div>
    )
  }
}

HomeView.propTypes = {
  getCurrentOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  orders: state.orders,
  user: state.user
})

export default connect((mapStateToProps), {
  getCurrentOrders
})(HomeView)
