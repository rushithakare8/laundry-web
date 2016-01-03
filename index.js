'use strict'
require("babel-core/register")
let Path = require('path')
let Jade = require('jade')
let Bell = require('bell')
let Good = require('good')
let Poop = require('poop')
let Inert = require('inert')
let Vision = require('vision')
let Scooter = require('scooter')
let Session = require('hapi-auth-cookie')
let webRoutes = require('./server/web/routes')
let apiRoutes = require('./server/api/routes')
let goodConfig = require('./configs/good.config')
let poopConfig = require('./configs/poop.config')
let vault = process.env.VAULT || require('./configs/vault');

exports.register = function(server, options, next) {
  server.register([
    {
      register: Good,
      options: goodConfig
    },
    {
      register: Poop,
      options: poopConfig
    },
    Session,
    Scooter,
    Vision,
    Inert,
    Bell
  ], function(err) {
    if (err) {
      throw err
    }

    let auth

    server.on('log', (event, tags) => {
      if (tags.error) {
        console.log('Server error: ' + (event.data || 'unspecified'))
      }
    })

    server.app.vault = vault;
    if (typeof vault === 'string') {
        server.app.vault = JSON.parse(vault);
    }

    auth = server.app.vault.auth

    server.auth.strategy('session', 'cookie', 'try', {
      password: server.app.vault.password,
      cookie: 'il_laundry_web',
      isSecure: false,
      ttl: 365 * 24 * 60 * 60 * 1000 // 1 Year
    });
    server.auth.strategy('facebook', 'bell', {
      provider: 'facebook',
      password: server.app.vault.password,
      clientId: auth.facebook.clientId,
      clientSecret: auth.facebook.clientSecret,
      isSecure: false // Terrible idea but required if not using HTTPS especially if developing locally
    });

    // Register templates views engine
    server.views({
      engines: {
        jade: Jade,
      },
      path: Path.join(__dirname, 'server/web/views'),
    })

    // Static Assets Routes
    server.route({
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'public/'),
          listing: true
        }
      }
    })

    server.route(webRoutes)
    server.route(apiRoutes)
  })
  next()
}

exports.register.attributes = {
  name: 'il-laundry-consumer-web'
}
