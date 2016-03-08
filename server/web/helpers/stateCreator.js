'use strict'

let getUser = (req) => {
  const user = Object.assign({}, req.auth.credentials.user.profile, {
    pointsMissing: 1500,
    pointsCompleted: 70
  })
  return user;
}
let getState = (req) => {
  return {
    orders: null,
    user: getUser(req)
  }
}

module.exports = {
  getState: getState,
  getUser: getUser
}
