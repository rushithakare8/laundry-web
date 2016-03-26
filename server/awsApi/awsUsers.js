import { get, post } from './awsRequest';

module.exports = {
  getUserById(id) {
    return new Promise((resolve, reject) => {
      get(`clients/${id}`, resolve, reject);
    });
  },
  getUsersByEmail(email) {
    return new Promise((resolve, reject) => {
      get(`clients/email/${email}`, resolve, reject);
    });
  },
  createUser(payload) {
    return new Promise((resolve, reject) => {
      post('clients', payload, resolve, reject);
    });
  },
  addUserAddress(payload) {
    return new Promise((resolve, reject) => {
      post('address', payload, resolve, reject);
    });
  },
};
