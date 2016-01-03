'use strict'

let Lab = require('lab')
let Code = require('code')
let Manifest = require('../manifest')
let lab = exports.lab = Lab.script()

lab.experiment('Manifest', function () {

    lab.test('it gets manifest data', function (done) {

        Code.expect(Manifest.get('/')).to.be.an.object()

        done()
    })


    lab.test('it gets manifest meta data', function (done) {

        Code.expect(Manifest.meta('/')).to.match(/this file defines the plot device/i)

        done()
    })
})
