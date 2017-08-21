import r from 'request';
import boom from 'boom';
import Tokens from 'csrf';
import querystring from 'querystring';
import {
  createUser,
  addUserPhone,
  getUsersByEmail,
  getUsersByLoginId,
} from 'il-middleware-services/server/beApi/beUsers';
import { getVault } from '../../../configs/getEnviroment';

const vault = getVault();
const tokens = new Tokens();
const appSecret = vault.auth.facebook.accountKitSecret;
const meEndpointBaseUrl = 'https://graph.accountkit.com/v1.0/me';
const tokenExchangeBaseUrl = 'https://graph.accountkit.com/v1.0/access_token';
const fbAccount = {
  appId: vault.auth.facebook.clientId,
  version: 'v1.0',
};

export const secret = tokens.secretSync();

export const getToken = () => tokens.create(secret);

export const getFBAccount = () => Object.assign({}, fbAccount, {
  csrf: getToken(),
});

// Logout
export const logout = {
  handler(request, reply) {
    request.cookieAuth.clear();
    return reply.redirect('/');
  },
};

const signin = (request, reply, user, profile) => {
  const userCookie = Object.assign({}, profile, user);
  request.cookieAuth.set({ user: userCookie });
  return reply.redirect('/main');
};

// Third party authentication
export const login = {
  auth: 'facebook',
  handler(request, reply) {
    const profile = request.auth.credentials.profile;
    if (!request.auth.isAuthenticated) {
      return reply(`Authentication failed due to: ${request.auth.error.message}`);
    }
    const userPayload = {
      email: profile.email,
      lastName: profile.name.last,
      name: profile.name.first,
    };
    return getUsersByEmail(profile.email).then(user => (
      user ? signin(request, reply, user, profile) : createUser(userPayload).then(newUser =>
        signin(request, reply, newUser, profile),
      )
    )).catch(err => reply(boom.badImplementation('Internal Server Error', err)));
  },
};

export const accountkitlogin = {
  handler(request, reply) {
    if (tokens.verify(secret, request.payload.csrf_nonce)) {
      const appAccessToken = ['AA', fbAccount.appId, appSecret].join('|');
      const params = {
        grant_type: 'authorization_code',
        code: request.payload.code,
        access_token: appAccessToken,
      };
      // exchange tokens
      const tokenExchangeUrl = `${tokenExchangeBaseUrl}?${querystring.stringify(params)}`;
      return r.get({ url: tokenExchangeUrl, json: true }, (exErr, exResp, exRespBody) => {
        const meParams = {
          access_token: exRespBody.access_token,
        };
        const meEndpointUrl = `${meEndpointBaseUrl}?${querystring.stringify(meParams)}`;
        return r.get({ url: meEndpointUrl, json: true }, (meErr, meResp, meRespBody) => {
          const userPayload = {
            loginID: meRespBody.id,
            email: meRespBody.email && meRespBody.email.address,
          };
          return getUsersByLoginId(meRespBody.id).then((users) => {
            const user = users[0];
            if (user) {
              return signin(request, reply, user);
            }
            return createUser(userPayload).then((newUser) => {
              if (meRespBody.phone) {
                const phonePayload = {
                  idClient: newUser.idClient,
                  prefered: true,
                  number: meRespBody.phone.number,
                };
                addUserPhone(phonePayload);
              }
              return signin(request, reply, newUser);
            });
          }).catch(err => reply(boom.badImplementation('Internal Server Error', err)));
        });
      });
    }
    return reply(boom.badImplementation('Internal Server Error'));
  },
};
