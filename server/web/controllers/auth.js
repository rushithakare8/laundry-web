import boom from 'boom';
import {
  createUser,
  getUsersByEmail,
} from 'il-middleware-services/server/beApi/beUsers';

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
    const profile = request.auth.credentials.profile;
    const signin = (user) => {
      const userCookie = Object.assign({}, profile, user);
      request.cookieAuth.set({ user: userCookie });
      return reply.redirect('/main');
    };
    if (!request.auth.isAuthenticated) {
      return reply(`Authentication failed due to: ${request.auth.error.message}`);
    }
    const userPayload = {
      email: profile.email,
      lastName: profile.name.last,
      name: profile.name.first,
    };
    return getUsersByEmail(profile.email)
      .then(user => (user ? signin(user) : createUser(userPayload).then(newUser => signin(newUser))))
      .catch((err) => reply(boom.badImplementation('Internal Server Error', err)));
  },
};
