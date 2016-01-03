'use strict'

import { Component } from 'react'

class Footer extends Component {
	render() {
		return (
			<footer id='' data-role='footer'>
				<div className=''>
					<div className=''><hr /></div>
					<p className=''>
						Copyright © 2015, Interactive Labs.<br />
						<a href='/about/terms.htm' target='_blank' rel='nofollow'>Terms of Use</a>
						<a href='/about/privacy.htm' target='_blank' rel='nofollow'>Privacy & Cookies</a>
					</p>
				</div>
			</footer>
		)
	}
}

module.exports = Footer
