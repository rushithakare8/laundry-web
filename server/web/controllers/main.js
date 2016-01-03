'use strict'

// let React = require('react')
// let ReactDOMServer = require('react-dom/server')
let ViewData = require('../helpers/ViewData')
// let MyJobs = require('../../app/components/myJobs.jsx')
// let Router = require('react-router').Router
// let Route = require('react-router').Route

exports.index = {
	handler(request, reply) {
		let baseData = ViewData.getBaseData()
		// let html = ReactDOMServer.renderToString(<MyJobs />)
		// baseData.appHtml = html
		// console.log(html)
		return reply.view('index', baseData)
	}
}
