// const env = process.env.NODE_ENV || 'development';

exports.getBaseData = request => ({
  error: null,
  versions: request.server.app.versions,
  isAuthenticated: request.auth.isAuthenticated,
  minAssets: process.env.NODE_ENV === 'production' ? '.min' : '',
});
