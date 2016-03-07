'use strict'

export const UPDATE_USER = 'UPDATE_USER'

export const updateUser = (value) => ({
  type: UPDATE_USER,
  payload: value
})

export const actions = {
  updateUser
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [UPDATE_USER]: (state, action) => state + action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function userReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
