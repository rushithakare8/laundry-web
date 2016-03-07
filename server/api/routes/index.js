'use strict'

let Main = require('../controllers/main.js')
let Orders = require('../controllers/orders.js')

let FalcorHandler = require('../falcor-routes/falcor-handler')
let AppFalcorRouter = require('../falcor-routes/falcor-routes')

module.exports = [
  { method: 'GET', path: '/api/v1/getdata/{id}', config: Main.getData },
  { method: 'GET', path: '/api/v1/getcurrentorders', config: Orders.getCurrentOrders },
  {
    method: ["GET", "POST"],
    path: "/model.json",
    handler: FalcorHandler.dataSourceRoute(function(request, reply) {
      return new AppFalcorRouter({});
    })
  }
]
