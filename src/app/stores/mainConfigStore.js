import thunk from 'redux-thunk'
import { reduxReactRouter } from 'redux-router'
import { createStore, applyMiddleware, compose } from 'redux'
import createHistory from 'history/lib/createBrowserHistory'
import routes from '../routes/mainRoutes.jsx'
import rootReducer from '../reducers/mainReducer.js'

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ routes, createHistory })
)(createStore)

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  return store
}
