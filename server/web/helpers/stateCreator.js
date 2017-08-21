import { getUserById } from 'il-middleware-services/server/beApi/beUsers';
import { getServiceTypes } from 'il-middleware-services/server/beApi/beServiceTypes';

const getUser = request => new Promise((resolve, reject) => {
  const signedInUser = request.auth.credentials.user;
  getUserById(signedInUser.idClient).then((userData) => {
    const user = Object.assign({}, signedInUser, userData);
    resolve(user);
  }).catch((err) => {
    reject(err);
  });
});

const getState = request => new Promise((resolve, reject) => {
  const state = {};
  state.cart = {
    price: 0,
    services: [],
  };
  getUser(request).then((user) => {
    state.user = user;
    return getServiceTypes().then((services) => {
      state.services = services;
      resolve(state);
    });
  })
    .catch(err => reject(err));
});

module.exports = {
  getState,
  getUser,
};
