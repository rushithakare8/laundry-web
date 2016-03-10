

const getUser = (req) => {
  const user = Object.assign({}, req.auth.credentials.user.profile, {
    pointsMissing: 1500,
    pointsCompleted: 70,
  });
  return user;
};

const getState = (req) => ({
  orders: null,
  user: getUser(req),
});

module.exports = {
  getState,
  getUser,
};
