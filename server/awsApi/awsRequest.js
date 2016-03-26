
import r from 'request';
import env from '../../configs/getEnviroment';
const host = env.getApiHost();
const vault = env.getVault();
const options = {
  auth: {
    user: vault.api.user,
    pass: vault.api.password,
  },
  json: true,
};

export const get = (path, resolve, reject) => {
  r.get(`${host}/${path}`, options, (err, res, result) => {
    if (err) {
      reject(err);
    }
    resolve(result);
  });
};

export const post = (path, payload, resolve, reject) => {
  const reqOptions = Object.assign({}, options, { body: payload });
  r.post(`${host}/${path}`, reqOptions, (err, res, result) => {
    if (err) {
      reject(err);
    }
    resolve(result);
  });
};
