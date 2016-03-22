import Main from '../controllers/main.js';
import Home from '../controllers/home.js';
import Auth from '../controllers/auth.js';

module.exports = [
  { method: 'GET', path: '/', config: Home.index },
  { method: ['GET', 'POST'], path: '/auth/facebook', config: Auth.login },
  { method: 'GET', path: '/favicon.ico', handler: { file: 'public/img/favicon.ico' } },
  {
    method: 'GET',
    path: '/apple-touch-icon-precomposed.png',
    handler: { file: 'public/img/apple-touch-icon-precomposed.png' },
  },
  {
    method: 'GET',
    path: '/apple-touch-icon.png',
    handler: { file: 'public/img/apple-touch-icon.png' },
  },
  { method: 'GET', path: '/main', config: Main.index },
  { method: 'GET', path: '/main/{path*}', config: Main.index },
];
