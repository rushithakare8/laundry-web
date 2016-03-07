'use strict'

import jquery from 'jQuery'
import falcor from 'falcor'

import { getOrders } from './actions'
import { GET_CURRENT_ORDERS } from './constants'
import { currentOrdersReducer } from './reducers'

export const getCurrentOrders = () => {
  return (dispatch, getState) => {
    let ordersModel = new falcor.Model({
      source: new falcor.HttpDataSource('/model.json')
    })

    ordersModel.get(['myorders', { from: 0, to: 3 }, 'city']).then((value) => {
      console.log(value)
    })

    jquery.get('/api/v1/getcurrentorders', (data) => {
      dispatch(getOrders(data.orders))
    })
  }
}

export const actions = {
  getCurrentOrders
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_CURRENT_ORDERS]: currentOrdersReducer
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function ordersReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
