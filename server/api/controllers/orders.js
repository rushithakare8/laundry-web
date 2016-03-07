'use strict'

import Joi from 'joi'
import Boom from 'boom'
import { getFakeOrder } from '../fakeData/order'

module.exports = {
  getCurrentOrders: {
    auth: 'session',
    handler(request, reply) {
      let orders = []
      for (var i = 0; i < 1; i++) {
        let order = getFakeOrder()
        orders.push(order)
      }
      return reply({ orders: orders })
    }
  }
}
