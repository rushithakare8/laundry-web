'use strict'

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { increment, doubleAsync } from '../../redux/modules/counter'

export class HomeView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <div>
          Sample Counter:
          <span>{this.props.counter}</span>
        </div>
        <button className='button' onClick={this.props.increment}>Increment</button>
        <button className='button' onClick={this.props.doubleAsync}>Double (Async)</button>
      </div>
    )
  }
}

HomeView.propTypes = {
  counter: PropTypes.number.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

export default connect((mapStateToProps), {
  increment: () => increment(1),
  doubleAsync
})(HomeView)
