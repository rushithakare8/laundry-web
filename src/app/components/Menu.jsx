'use strict'

import { Component, PropTypes } from 'react'

class Menu extends Component {
	render() {
		return(
      <div className='sidebar'>
        <div className='sidebar-overlay'></div>
        <div className='sidebar-content'>
          <div className='top-head'>
            <div className='name'>Luis Gonzalez</div>
            <div className='email'>luis@test.com</div>
          </div>
          <nav className='nav-left'>
            <a href='#home'><span className='ion-ios-home-outline'></span> Home</a>
            <a href='#alarm'><span className='ion-ios-list-outline'></span> Alarm</a>
            <a href='#compose'><span className='ion-ios-compose-outline'></span> Compose</a>
            <a href='#chats'><span className='ion-ios-chatboxes-outline'></span> Chats</a>
            <a href='#profile'><span className='ion-ios-person-outline'></span> Profile</a>
            <a href='#settings'><span className='ion-ios-gear-outline'></span> Settings</a>
            <a href='#credits'><span className='ion-ios-information-outline'></span> Credits</a>
          </nav>
        </div>
      </div>
		)
	}
}

Menu.propTypes = {
  opened: PropTypes.bool.isRequired
}

module.exports = Menu
