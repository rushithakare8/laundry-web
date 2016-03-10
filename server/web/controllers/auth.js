// import Boom from 'boom';

// Logout
exports.logout = {
  auth: 'facebook',
  handler(request, reply) {
    request.cookieAuth.clear();
    return reply.redirect('/');
  },
};

// Third party authentication
exports.login = {
  auth: 'facebook',
  handler(request, reply) {
    // let user;
    // let credentials;
    if (!request.auth.isAuthenticated) {
      return reply(`Authentication failed due to: ${request.auth.error.message}`);
    }
    request.cookieAuth.set({ user: request.auth.credentials });
    return reply.redirect('/main');
  },
};
