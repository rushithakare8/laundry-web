'use strict'

import React, { PropTypes } from 'react'

import Header from '../../components/Header'
import Menu from '../../components/Menu'

const routeToTitle = {
  '/main' : 'HOME'
}

class CoreLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openedMenu : false }
    this.openMenu = this.openMenu.bind(this)
  }
  openMenu() {
    this.setState({
      openedMenu: !this.state.openedMenu
    })
  }
  render () {
    const { children } = this.props
    const title = routeToTitle[this.props.route.path]
    return (
      <div>
        <Header title={ title } openMenu={ this.openMenu } />
        <Menu opened={ this.state.openedMenu } />
        {children}
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: PropTypes.element
}

export default CoreLayout
