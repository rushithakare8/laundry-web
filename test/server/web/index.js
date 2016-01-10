'use strict'

var Lab = require('lab')
var Code = require('code')
var composer = require('../../../server.js')

var lab = exports.lab = Lab.script()
var request, server


lab.beforeEach(function (done) {

  composer(function(err, composedServer) {

    if (err) {
      throw err
    }

    server = composedServer

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

            Code.expect(response.result).to.match(/Web Laundry - Interactive Labs/i)
            Code.expect(response.statusCode).to.equal(200)

            done()
        })
    })
})
