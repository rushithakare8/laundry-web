
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
    react: 'React',
    redux: 'Redux',
    jquery: 'jQuery',
    'socket.io': 'io',
    history: 'History',
    'chart.js': 'Chart',
    flatpickr: 'flatpickr',
    immutable: 'Immutable',
    'field-kit': 'FieldKit',
    'react-dom': 'ReactDOM',
    classnames: 'classNames',
    'redux-form': 'ReduxForm',
    'react-redux': 'ReactRedux',
    'redux-thunk': 'ReduxThunk',
    'es6-promise': 'ES6Promise',
    'react-router': 'ReactRouter',
    'react-router-redux': 'ReactRouterRedux',
  },
  debug: true,
};
