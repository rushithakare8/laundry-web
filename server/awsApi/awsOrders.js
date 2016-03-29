import { get } from './awsRequest';

module.exports = {
  getCurrentOrders(idClient) {
    return new Promise((resolve, reject) => {
      get(`app-orders/orders/${idClient}`, resolve, reject);
    });
  },
};
