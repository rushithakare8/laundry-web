'use strict'

let Console = require('good-console')

module.exports = {
    opsInterval: 100000,
    reporters: [{
        reporter: Console,
        events: { log: '*', response: '*', error: '*', ops: '*' }
    }]
}
