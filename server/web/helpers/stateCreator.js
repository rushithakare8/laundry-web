import { getUserById } from '../../awsApi/awsUsers';

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
    return getCurrentOrders();
  }).then((orders) => {
    state.orders = orders;
    // console.log(orders);
    resolve(state);
  }).catch(err => reject(err));
});

module.exports = {
  getState,
  getUser,
};
