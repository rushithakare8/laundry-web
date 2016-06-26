import r from 'request';
import boom from 'boom';
import Tokens from 'csrf';
import querystring from 'querystring';
import {
  createUser,
  getUsersByEmail,
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
  auth: 'facebook',
  handler(request, reply) {
    request.cookieAuth.clear();
    return reply.redirect('/');
  },
};

// Third party authentication
export const login = {
  auth: 'facebook',
  handler(request, reply) {
    const signin = (user, profile) => {
      const userCookie = Object.assign({}, profile, user);
      request.cookieAuth.set({ user: userCookie });
      return reply.redirect('/main');
    };
    const profile = request.auth.credentials.profile;
    if (!request.auth.isAuthenticated) {
      return reply(`Authentication failed due to: ${request.auth.error.message}`);
    }
    const userPayload = {
      email: profile.email,
      lastName: profile.name.last,
      name: profile.name.first,
    };
    return getUsersByEmail(profile.email)
      .then(user => (user ? signin(user, profile) : createUser(userPayload).then(newUser => signin(newUser, profile))))
      .catch((err) => reply(boom.badImplementation('Internal Server Error', err)));
  },
};

export const accountkitlogin = {
  handler(request, reply) {
    // const signin = (user) => {
    //   const userCookie = Object.assign({}, user);
    //   request.cookieAuth.set({ user: userCookie });
    //   return reply.redirect('/main');
    // };
    if (tokens.verify(secret, request.payload.csrf_nonce)) {
      const appAccessToken = ['AA', fbAccount.appId, appSecret].join('|');
      let params = {
        grant_type: 'authorization_code',
        code: request.payload.code,
        access_token: appAccessToken,
      };
      // exchange tokens
      const tokenExchangeUrl = `${tokenExchangeBaseUrl}?${querystring.stringify(params)}`;
      return r.get({ url: tokenExchangeUrl, json: true }, (exErr, exResp, exRespBody) => {
        params = {
          access_token: exRespBody.access_token,
        };
        const meEndpointUrl = `${meEndpointBaseUrl}?${querystring.stringify(params)}`;
        return r.get({ url: meEndpointUrl, json: true }, (meErr, meResp, meRespBody) => {
          console.log('meRespBody', meRespBody);
          return reply.redirect('/');
          // const userPayload = {
          //   email: meRespBody.email,
          //   phoneNumber: meRespBody.phoneNumber,
          // };
          // if (meRespBody.phone) {
          //   return getUsersByEmail(meRespBody.email)
          //     .then(user => (user ? signin(user) : createUser(userPayload).then(newUser => signin(newUser))))
          //     .catch((err) => reply(boom.badImplementation('Internal Server Error', err)));
          // }
          // return getUsersByEmail(meRespBody.email)
          //   .then(user => (user ? signin(user) : createUser(userPayload).then(newUser => signin(newUser))))
          //   .catch((err) => reply(boom.badImplementation('Internal Server Error', err)));
        });
      });
    }
    return reply(boom.badImplementation('Internal Server Error'));
  },
};
