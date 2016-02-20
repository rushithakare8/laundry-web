'use strict'

import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore (initialState = {}) {
  let middleware = applyMiddleware(thunk)
  const store = middleware(createStore)(rootReducer, initialState)
  return store
}
