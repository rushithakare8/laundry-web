'use strict'

let getUser = (req) => {
  return req.auth.credentials.user.profile;
}
let getState = (req) => {
  return {
    counter: 0,
    user: getUser(req)
  }
}

module.exports = {
  getState: getState,
  getUser: getUser
}
