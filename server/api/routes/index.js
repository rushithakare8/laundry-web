import Main from '../controllers/main.js';
import Orders from '../controllers/orders.js';
import FalcorHandler from '../falcor/falcorHandler';
import AppFalcorRouter from '../falcor/falcorRoutes';

module.exports = [
  { method: 'GET', path: '/api/v1/getdata/{id}', config: Main.getData },
  { method: 'GET', path: '/api/v1/getcurrentorders', config: Orders.getCurrentOrders },
  {
    method: ['GET', 'POST'],
    path: '/model.json',
    handler: FalcorHandler.dataSourceRoute(() => new AppFalcorRouter({})),
  },
];
