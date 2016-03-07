
import { GET_CURRENT_ORDERS } from './constants'

export const getOrders = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: orders
})
