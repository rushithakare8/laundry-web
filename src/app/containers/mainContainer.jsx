'use strict'

import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { pushState } from 'redux-router'
import Index from '../components/index.jsx'
import { getData } from '../actions/mainActions.js'
import { reduceData } from '../reducers/mainReducer.js';

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.updateData = this.updateData.bind(this)
  }
  componentWillMount() {
    this.props.getData({ id: 1 })
  }
  updateData(parms) {
    this.props.getData({ id: 2 })
  }
  render() {
    const { data } = this.props
    return (
      <div>
        <Index data={ data } updateData={ this.updateData } />
      </div>
    )
  }
}

MainContainer.propTypes = {
  getData: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    data: reduceData(state)
  }
}

export default connect(mapStateToProps, {
  getData,
  pushState
})(MainContainer)
