'use strict'
// **************************************************************************************
// Boiler plate code to connect the redux-router to the actual routes and the store.
// **************************************************************************************

import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

class Root extends Component {
  render() {
    const { store } = this.props
    return (
      <Provider store={ store }>
        <ReduxRouter />
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}

module.exports = Root
