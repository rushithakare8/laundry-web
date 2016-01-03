'use strict'

var Lab = require('lab')
var Code = require('code')
var Config = require('../../../configs/server.config.js')
var Hapi = require('hapi')
var HomePlugin = require('../../../server.js')


var lab = exports.lab = Lab.script()
var request, server


lab.beforeEach(function (done) {

    var plugins = [ HomePlugin ]
    server = new Hapi.Server()
    server.connection({ port: Config.get('/port/web') })
    server.views({
        engines: { jade: require('jade') },
        path: './server/web'
    })
    server.register(plugins, function (err) {

        if (err) {
            return done(err)
        }

        done()
    })
})


lab.experiment('Home Page View', function () {

    lab.beforeEach(function (done) {

        request = {
            method: 'GET',
            url: '/'
        }

        done()
    })


    lab.test('home page renders properly', function (done) {

        server.inject(request, function (response) {

            Code.expect(response.result).to.match(/activate the plot device/i)
            Code.expect(response.statusCode).to.equal(200)

            done()
        })
    })
})
