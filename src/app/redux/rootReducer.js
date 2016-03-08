'use strict'

import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import falcor from './reducers/falcor'
import orders from './reducers/orders'
import user from './reducers/user'

export default combineReducers({
  user,
  orders,
  router,
  falcor
})
