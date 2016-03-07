
import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './rootReducer'

export default function configureStore (initialState = {}) {
  let middleware = applyMiddleware(ReduxThunk)
  const store = middleware(createStore)(rootReducer, initialState)
  return store
}
