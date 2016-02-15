'use strict'

// let React = require('react')
// let ReactDOMServer = require('react-dom/server')
let ViewData = require('../helpers/ViewData')
// let MyJobs = require('../../app/components/myJobs.jsx')
// let Router = require('react-router').Router
// let Route = require('react-router').Route

exports.index = {
	auth: 'session',
	handler(request, reply) {
		let baseData = ViewData.getBaseData()
		// let html = ReactDOMServer.renderToString(<MyJobs />)
		// baseData.appHtml = html
		// console.log(html)
		console.log(request.auth.credentials);
		return reply.view('main', baseData)
	}
}
