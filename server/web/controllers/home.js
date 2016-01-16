'use strict'

let ViewData = require('../helpers/ViewData')

exports.index = {
	handler(request, reply) {
		let baseData = ViewData.getBaseData()
		return reply.view('home', baseData)
	}
}
