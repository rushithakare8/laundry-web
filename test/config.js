'use strict'

let Lab = require('lab')
let Code = require('code')
let Config = require('../configs/server.config.js')
let lab = exports.lab = Lab.script()


lab.experiment('Config', function () {

    lab.test('it gets config data', function (done) {

        Code.expect(Config.get('/')).to.be.an.object()

        done()
    })


    lab.test('it gets config meta data', function (done) {

        Code.expect(Config.meta('/')).to.match(/this file configures the plot device/i)

        done()
    })
})
