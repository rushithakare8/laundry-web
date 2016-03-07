'use strict'

import ViewData from '../helpers/ViewData'
import appRender from '../helpers/appRender'
import { getState } from '../helpers/stateCreator'

exports.index = {
	auth: 'session',
	handler(request, reply) {
		let baseData = ViewData.getBaseData()
		let state = getState(request)
		baseData.state = state
		appRender(request.path, state).then(function(html) {
			baseData.html = html
			return reply.view('main', baseData)
		}).catch(function(error) {
			console.log('AppRender Error: ', error)
			return reply.view('main', baseData)
		})
	}
}
