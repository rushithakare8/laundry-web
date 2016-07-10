
module.exports = {
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
    'es6-promise': 'ES6Promise',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk',
    'redux-form': 'ReduxForm',
    'react-dom': 'ReactDOM',
    immutable: 'Immutable',
    flatpickr: 'flatpickr',
    history: 'History',
    jquery: 'jQuery',
    react: 'React',
    redux: 'Redux',
  },
  debug: true,
};
