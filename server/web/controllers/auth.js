'use strict'

let Boom = require('boom')

// Logout
exports.logout = {
	auth: 'facebook',
	handler(request, reply) {
	    request.auth.session.clear()
	    return reply.redirect('/')
	}
}

// Third party authentication
exports.login = {
	auth: 'facebook',
	handler(request, reply) {
    let user = {}
    let credentials = request.auth.credentials
		if (!request.auth.isAuthenticated) {
      return reply('Authentication failed due to: ' + request.auth.error.message);
    }
    return reply.redirect('/')
  }
}
