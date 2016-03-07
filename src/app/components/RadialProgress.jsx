'use strict'

import React, { PropTypes } from 'react'

class RadialProgress extends React.Component {
	render() {
		return(
      <div className='radial-progress' data-progress={ this.props.progress }>
        <div className='circle'>
          <div className='mask full'>
            <div className='fill'></div>
          </div>
          <div className='mask half'>
            <div className='fill'></div>
            <div className='fill fix'></div>
          </div>
          <div className='shadow'></div>
        </div>
        <div className='inset'>
          <div className='percentage'>
            <div className='numbers'><span>{ this.props.progress }%</span></div>
          </div>
        </div>
      </div>
		)
	}
}

RadialProgress.propTypes = {
  progress: PropTypes.number.isRequired
}

module.exports = RadialProgress
