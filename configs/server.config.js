'use strict'
let Confidence = require('confidence')
let criteria = {
  env: process.env.NODE_ENV,
}
let config = {
  $meta: 'This file configures the plot device.',
  projectName: 'il-laundry-consumer-web',
  port: {
    web: {
      $filter: 'env',
      test: 9090,
      $default: 3000,
    },
  },
}
let store = new Confidence.Store(config)

exports.get = key => store.get(key, criteria)

exports.meta = key => store.meta(key, criteria)
