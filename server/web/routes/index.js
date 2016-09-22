import { main } from '../controllers/main';
import { index, about, routes, faq } from '../controllers/home';
import { login, logout, accountkitlogin } from '../controllers/auth';

module.exports = [
  { method: 'GET', path: '/', config: index },
  { method: 'GET', path: '/about', config: about },
  { method: 'GET', path: '/routes', config: routes },
  { method: 'GET', path: '/faq', config: faq },
  { method: 'GET', path: '/logout', config: logout },
  { method: ['GET', 'POST'], path: '/auth/facebook', config: login },
  { method: 'POST', path: '/accountkitlogin', config: accountkitlogin },
  { method: 'GET', path: '/main', config: main },
  { method: 'GET', path: '/main/{path*}', config: main },
  // FAVICON
  { method: 'GET', path: '/favicon.ico', handler: { file: 'public/img/favicon.ico' } },
  { method: 'GET', path: '/apple-touch-icon.png', handler: { file: 'public/img/apple-touch-icon.png' } },
  { method: 'GET', path: '/apple-touch-icon-precomposed.png', handler: { file: 'public/img/apple-touch-icon-precomposed.png' } },
];
