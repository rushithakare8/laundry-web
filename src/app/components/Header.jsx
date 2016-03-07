'use strict'

import React, { PropTypes } from 'react'

class Header extends React.Component {
	render() {
		return(
			<header className='header row align-justify P(15px)'>
        <div className='column'>
					<a className='C(#000) D(b) Ta(c)' onClick={ this.props.openMenu }>
						<i className='fa fa-bars float-left'></i>
						<span>{ this.props.title }</span>
					</a>
        </div>
			</header>
		)
	}
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired
}

module.exports = Header
