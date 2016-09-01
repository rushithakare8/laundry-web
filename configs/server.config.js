const Confidence = require('confidence');

const port = process.env.PORT || 3000;
const criteria = {
  env: process.env.NODE_ENV,
};
const config = {
  $meta: 'This file configures the plot device.',
  projectName: 'il-laundry-consumer-web',
  port: {
    web: {
      $filter: 'env',
      test: 9090,
      $default: port,
    },
  },
};

const store = new Confidence.Store(config);

exports.get = key => store.get(key, criteria);

exports.meta = key => store.meta(key, criteria);
