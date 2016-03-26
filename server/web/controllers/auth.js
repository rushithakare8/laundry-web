import Boom from 'boom';
import {
  createUser,
  getUsersByEmail,
} from '../../awsApi/awsUsers';

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
      .then((usersByEmail) => {
        if (!usersByEmail || usersByEmail.length < 1) {
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
            })
            .catch((err) => reply(new Boom(err)));
        }
        const userCookie = Object.assign({}, profile, { idClient: usersByEmail[0].idClient });
        request.cookieAuth.set({ user: userCookie });
        return reply.redirect('/main');
      })
      .catch((err) => reply(new Boom(err)));
  },
};
