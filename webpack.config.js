

const paths = require('./configs/paths.json');

module.exports = {
  context: __dirname,
  entry: paths.react.main,
  output: {
    filename: 'main.js',
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.webpack.js', '.jsx', '.js', '.json'],
  },
  externals: {
    'react-router-redux': 'ReactRouterRedux',
    'react-router': 'ReactRouter',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk',
    'redux-form': 'ReduxForm',
    'react-dom': 'ReactDOM',
    immutable: 'Immutable',
    history: 'History',
    jquery: 'jQuery',
    react: 'React',
    redux: 'Redux',
  },
  debug: true,
};
