

let Confidence = require('confidence');
let Config = require('./configs/server.config');
let criteria = {
  env: process.env.NODE_ENV,
};

let manifest = {
  $meta: 'This file compioses the server and the plugins [external servers] to be added to the server.',
  connections: [
    {
      port: Config.get('/port/web'),
      labels: ['il-laundry-consumer-web'],
    }
  ],
  // IMPORTING THE SERVER FROM INDEX.JS
  registrations: [
    {
      plugin: {
        register: './index',
        options: {}
      }
    }

  ]
};

let store = new Confidence.Store(manifest);

exports.get = key => store.get(key, criteria);

exports.meta = key => store.meta(key, criteria);
