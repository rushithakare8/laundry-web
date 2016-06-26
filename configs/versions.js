import installed from 'installed';
import { fromJS } from 'immutable';
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
];

// default options
const options = {
  dev: true,        // exclude all dev dependencies
  depth: 0,         // depth to traverse
  extraneous: false // includes extraneous deps. Set to false to filter extraneous dependencies out.
}

module.exports = new Promise((res, rej) => installed(process.cwd(), options, (err, pkgs) => {
  if (err) {
    rej(err);
  }
  const versions = packages.reduce((agg, pk) => {
    const ver = pkgs.filter(dep => dep.name === pk)[0].version;
    return Object.assign({}, agg, { [pk]: ver });
  }, {});
  res(versions);
}));
