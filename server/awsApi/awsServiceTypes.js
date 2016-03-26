import { get, post } from './awsRequest';

module.exports = {
  getServiceTypes() {
    return new Promise((resolve, reject) => {
      get('service-type', resolve, reject);
    });
  },
  createServiceType(payload) {
    return new Promise((resolve, reject) => {
      post('service-type', payload, resolve, reject);
    });
  },
};
