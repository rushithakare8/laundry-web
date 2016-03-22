import { getOrders } from '../fakeData/order';

module.exports = {
  getCurrentOrders: {
    auth: 'session',
    handler(request, reply) {
      getOrders(request.params.count).then((orders) => reply({ orders }));
    },
  },
};
