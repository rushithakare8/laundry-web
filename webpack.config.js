
const webpackConfig = require('./configs/base-webpack.config');
const paths = require('./configs/paths.json');

const appConfig = Object.assign({}, webpackConfig, {
  context: __dirname,
  entry: paths.react.main,
  output: {
    filename: 'main.js',
  },
});

const homeConfig = Object.assign({}, webpackConfig, {
  context: __dirname,
  entry: paths.js.main,
  output: {
    filename: 'home.js',
  },
});

module.exports = [appConfig, homeConfig];
