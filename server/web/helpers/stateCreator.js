import { order, serviceType, user as userApi } from '../../api';

const getUser = (request) => new Promise((resolve) => {
  const signedInUser = request.auth.credentials.user.profile;
  userApi.getUserData(signedInUser).then((userData) => {
    const user = Object.assign({}, signedInUser, userData);
    resolve(user);
  });
});

const getServiceTypes = (n) => new Promise((resolve) => {
  serviceType.getServiceTypes(n).then((serviceTypes) => {
    resolve(serviceTypes);
  });
});

const getCurrentOrders = (n) => new Promise((resolve) => {
  order.getOrders(n).then((orders) => {
    resolve(orders);
  });
});


const getState = (request) => new Promise((resolve) => {
  const state = {};
  getUser(request).then((user) => {
    state.user = user;
    return getServiceTypes(2);
  }).then((serviceTypes) => {
    state.serviceTypes = serviceTypes;
    return getCurrentOrders(2, state.user);
  }).then((orders) => {
    state.orders = orders;
    // console.log(orders);
    resolve(state);
  });
});

module.exports = {
  getState,
  getUser,
};
