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
    if (!request.auth.isAuthenticated) {
      return reply(`Authentication failed due to: ${request.auth.error.message}`);
    }
    return getUsersByEmail(profile.email)
      .then((user) => {
        if (!user || user.idClient === 0) {
          const userPayload = {
            email: profile.email,
            lastName: profile.name.last,
            name: profile.name.first,
          };
          return createUser(userPayload)
            .then((newUser) => {
              const userCookie = Object.assign({}, profile, { idClient: newUser.idClient });
              request.cookieAuth.set({ user: userCookie });
              return reply.redirect('/main');
            });
        }
        const userCookie = Object.assign({}, profile, { idClient: user.idClient });
        request.cookieAuth.set({ user: userCookie });
        return reply.redirect('/main');
      })
      .catch((err) => {
        console.error(err);
        return reply(boom.badImplementation('Internal Server Error'));
      });
  },
};
