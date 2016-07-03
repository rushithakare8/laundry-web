import { getUserById } from 'il-middleware-services/server/beApi/beUsers';
import { getServiceTypes } from 'il-middleware-services/server/beApi/beServiceTypes';
import { getCurrentOrders } from 'il-middleware-services/server/beApi/beOrders';

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
  state.cart = {
    price: 0,
    services: [],
  };
  getUser(request).then((user) => {
    state.user = user;
    return getServiceTypes().then((serviceTypes) => {
      state.serviceTypes = serviceTypes;
      return getCurrentOrders(state.user.idClient).then((orders) => {
        state.orders = orders;
        resolve(state);
      });
    });
  })
  .catch(err => reject(err));
});

module.exports = {
  getState,
  getUser,
};
