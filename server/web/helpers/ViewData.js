// const env = process.env.NODE_ENV || 'development';

exports.getBaseData = () => ({
  minAssets: process.env.NODE_ENV === 'production' ? '.min' : '',
  error: null,
});
