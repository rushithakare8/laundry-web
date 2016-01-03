'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import { Link } from 'react-router'
import Header from '../components/common/header.jsx'
import Footer from '../components/common/footer.jsx'

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <Header />
        <div className='' >
          <div className=''>
            { children }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

App.propTypes = {
  pushState: PropTypes.func.isRequired,
  // Injected by React Router
  children: PropTypes.node
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {
  pushState
})(App)
