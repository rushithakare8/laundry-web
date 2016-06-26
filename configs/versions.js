import installed from 'installed';
const packages = [
  'react',
  'react-dom',
  'immutable',
  'redux',
  'react-router',
  'react-redux',
  'redux-thunk',
  'redux-form',
  'react-router-redux',
  'history',
  'es6-promise',
  'flatpickr',
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
