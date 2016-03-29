import { getUserById } from '../../awsApi/awsUsers';
import { getServiceTypes } from '../../awsApi/awsServiceTypes';
import { getCurrentOrders } from '../../awsApi/awsOrders';

const getUser = (request) => new Promise((resolve, reject) => {
  const signedInUser = request.auth.credentials.user;
  getUserById(signedInUser.idClient).then((userData) => {
    const user = Object.assign({}, signedInUser, userData);
    resolve(user);
  }).catch((err) => {
    reject(err);
  });
});

const getState = (request) => new Promise((resolve, reject) => {
  const state = {};
  getUser(request).then((user) => {
    state.user = user;
    return getServiceTypes();
  }).then((serviceTypes) => {
    state.serviceTypes = serviceTypes;
    return getCurrentOrders(state.user.idClient);
  }).then((orders) => {
    state.orders = orders;
    resolve(state);
  }).catch(err => reject(err));
});

module.exports = {
  getState,
  getUser,
};
