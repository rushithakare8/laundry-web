'use strict'

let Lab = require('lab')
let Code = require('code')
let composer = require('../index')
let lab = exports.lab = Lab.script()


lab.experiment('App', function () {

    lab.test('it composes a server', function (done) {

        composer(function (err, composedServer) {

            Code.expect(composedServer).to.be.an.object()

            done(err)
        })
    })
})
