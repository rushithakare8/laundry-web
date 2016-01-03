'use strict'
let Main = require('../controllers/main.js')
let Auth = require('../controllers/auth.js')

module.exports = [
  { method: 'GET', path: '/', config: Main.index },
  { method: ['GET', 'POST'], path: '/auth/facebook', config: Auth.login }
]
