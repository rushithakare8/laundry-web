// const env = process.env.NODE_ENV || 'development';

exports.getBaseData = (app) => ({
  minAssets: process.env.NODE_ENV === 'production' ? '.min' : '',
  versions: app.versions,
  error: null,
});
