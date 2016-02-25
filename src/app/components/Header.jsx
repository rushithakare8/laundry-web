'use strict'

import React, { PropTypes } from 'react'

class Header extends React.Component {
	render() {
		return(
			<header className='header row P(15px)'>
        <div className='Mend(25px)'>
					<a className='C(#000)' onClick={ this.props.openMenu }>
          	<i className='fa fa-bars Mend(10px)'></i>
        		<span>Menu</span>
					</a>
        </div>
			</header>
		)
	}
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired
}

module.exports = Header
