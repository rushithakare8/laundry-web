import installed from 'installed';

const packages = [
  'react',
  'redux',
  'jquery',
  'history',
  'chart.js',
  'cleave.js',
  'socket.io',
  'react-dom',
  'immutable',
  'flatpickr',
  'field-kit',
  'classnames',
  'redux-form',
  'react-redux',
  'redux-thunk',
  'es6-promise',
  'react-router',
  'react-router-redux',
];

// default options
const options = {
  depth: 0,           // depth to traverse
  dev: true,          // exclude all dev dependencies
  extraneous: false,  // includes extraneous deps. Set to false to filter extraneous dependencies out.
};

module.exports = new Promise((res, rej) => installed(process.cwd(), options, (err, pkgs) => {
  if (err) {
    rej(err);
  }
  const versions = packages.reduce((acc, pk) => {
    const ver = pkgs.filter(dep => dep.name === pk)[0].version;
    return Object.assign({}, acc, { [pk]: ver });
  }, {});
  res(versions);
}));
