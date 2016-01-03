'use strict'

import { Component } from 'react'

class Index extends Component {
	constructor(props) {
    super(props)
    this.handleAction = this.handleAction.bind(this)
  }
	handleAction() {
		const { updateData } = this.props
		updateData()
	}
	render() {
		const { data } = this.props
		return (
			<div className='' >
				<button onClick={this.handleAction} >Action</button>
			</div>
		)
	}
}

module.exports = Index
