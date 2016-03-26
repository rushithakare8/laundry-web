import Joi from 'joi';
import Boom from 'boom';
import {
  getUser,
  createUser,
  addUserAddress,
} from '../../awsApi/awsUsers';

module.exports = {
  getUser: {
    validate: {
      params: {
        id: Joi.number().integer(),
      },
    },
    auth: 'session',
    handler(request, reply) {
      getUser(request.params.id)
        .then((result) => reply(result))
        .catch((err) => reply(new Boom(err)));
    },
  },
  createUser: {
    validate: {
      payload: {
        email: Joi.string().email().required(),
        lastName: Joi.string().required(),
        name: Joi.string().required(),
        password: Joi.string().optional(),
        twitter: Joi.string().optional(),
      },
    },
    auth: 'session',
    handler(request, reply) {
      createUser(request.payload)
        .then((result) => reply(result))
        .catch((err) => reply(new Boom(err)));
    },
  },
  addUserAddress: {
    validate: {
      payload: {
        address: Joi.string().required(),
        address2: Joi.string().optional(),
        city: Joi.string().required(),
        country: Joi.string().required(),
        zipcode: Joi.string().required(),
        state: Joi.string().required(),
        idClient: Joi.number().integer().required(),
      },
    },
    handler(request, reply) {
      addUserAddress(request.payload)
        .then((result) => reply(result))
        .catch((err) => reply(new Boom(err)));
    },
  },
};
