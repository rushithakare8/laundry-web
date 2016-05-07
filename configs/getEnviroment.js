import apiHost from './api.json';

const env = process.env.NODE_ENV || process.env.ENVIRONMENT;

module.exports = {
  getVault() {
    return process.env.VAULT ? JSON.parse(process.env.VAULT) : require('./vault');  // eslint-disable-line
  },
  getApiHost() {
    const api = apiHost[env];
    return `${api.protocol}://${api.host}:${api.port}/${api.version}`;
  },
};
