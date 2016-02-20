'use strict'

const ViewData = require('../helpers/ViewData')
const AppRender = require('../helpers/appRender')

exports.index = {
	auth: 'session',
	handler(request, reply) {
		let baseData = ViewData.getBaseData()
		AppRender(request.path, { counter: 2 }).then((html) => {
			// console.log(request.auth.credentials);
			baseData.html = html;
			return reply.view('main', baseData)
		}, (err) => {
			server.log(err);
			throw err
		})
	}
}
