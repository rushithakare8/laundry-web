// import Joi from 'joi';
// import Boom from 'boom';
import { getFakeOrder } from '../fakeData/order';

module.exports = {
  getCurrentOrders: {
    auth: 'session',
    handler(request, reply) {
      const orders = [];
      for (let i = 0; i < 1; i++) {
        const order = getFakeOrder();
        orders.push(order);
      }
      return reply({ orders });
    },
  },
};
