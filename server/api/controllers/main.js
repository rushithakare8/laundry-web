import Joi from 'joi';
import Boom from 'boom';

module.exports = {
  getData: {
    validate: {
      params: {
        id: Joi.number().integer().required(),
      },
    },
    handler(request, reply) {
      if (request.params.id < 1) {
        return reply(new Boom('Server Error'));
      }
      return reply({ success: true });
    },
  },
};
