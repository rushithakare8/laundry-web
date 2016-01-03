import _ from 'lodash'
import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import * as mainActions from '../constants/mainActionTypes.js'

function data(state = null, action) {
  switch (action.type) {
    case mainActions.GET_DATA:
      return _.merge({}, state, action.result)
      break
    default:
      return state
  }
}

const rootReducer = combineReducers({
  data,
  router
})

export default rootReducer

export function reduceData(state) {
  return state.data
}
