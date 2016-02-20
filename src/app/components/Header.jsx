'use strict'

import { Component, PropTypes } from 'react'

class Header extends Component {
	render() {
		return(
			<header className='header row Py(15px)'>
        <div className='Mend(25px)'>
					<a onClick={ this.props.openMenu }>
          	<i className='fa fa-bars Mend(10px)'></i>
        		<span>Menu</span>
					</a>
        </div>
        <div>{ this.props.title }</div>
			</header>
		)
	}
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired
}

module.exports = Header
