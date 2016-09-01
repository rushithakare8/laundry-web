const Path = require('path');
const Jade = require('jade');
const Bell = require('bell');
const Good = require('good');
const Poop = require('poop');
const Inert = require('inert');
const Vision = require('vision');
const Scooter = require('scooter');
const Session = require('hapi-auth-cookie');
const webRoutes = require('./server/web/routes');
const apiRoutes = require('il-middleware-services').apiRoutes;
const goodConfig = require('./configs/good.config');
const poopConfig = require('./configs/poop.config');
const versions = require('./configs/versions');
const vault = require('./configs/getEnviroment').getVault();
require('opbeat').start({
  appId: 'a6e428e550',
  organizationId: '2556f6e3f5c34d968c5a2e46f6c8eea5',
  secretToken: 'c74d95c618e4ee667677b30971b97943cab78e03',
});

exports.register = (server, options, next) => {
  server.register([
    {
      register: Good,
      options: goodConfig,
    },
    {
      register: Poop,
      options: poopConfig,
    },
    Session,
    Scooter,
    Vision,
    Inert,
    Bell,
  ], (err) => {
    if (err) {
      throw err;
    }
    const auth = vault.auth;
    versions.then(v => {
      server.app.versions = v; // eslint-disable-line
    });

    // ERROR HANDLIGN
    // server.ext('onPreResponse', (request, reply) => {
    //   const response = request.response;
    //   if (!response.isBoom) {
    //     // everything good, move on...
    //     return reply.continue();
    //   }
    //   // Error happened, do something
    //   const error = response;
    //   const baseData = {
    //     minAssets: '.min',
    //     error: {
    //       code: error.output.statusCode,
    //       message: (error.output.statusCode === 404 ? 'page not found' : 'something went wrong')
    //     }
    //   }
    //   server.log(error);
    //   console.log(request.path);
    //   console.log(error);
    //   if (request.path === '/auth/facebook' && error.message === 'App was rejected') {
    //     baseData.error.loginError = true;
    //     return reply.view('home', baseData)
    //   }
    //   return reply.view('error', baseData)
    // })

    server.on('log', (event, tags) => {
      if (tags.error) {
        console.log(`Server error: ${(event.data || 'unspecified')}`);
      }
    });

    server.auth.strategy('session', 'cookie', 'try', {
      password: vault.password,
      cookie: 'il_laundry_web',
      isSecure: false,
      ttl: 365 * 24 * 60 * 60 * 1000,  // 1 Year
    });
    server.auth.strategy('facebook', 'bell', {
      provider: 'facebook',
      password: vault.password,
      clientId: auth.facebook.clientId,
      clientSecret: auth.facebook.clientSecret,
      isSecure: false, // Terrible idea but required if not using HTTPS
    });

    // Register templates views engine
    server.views({
      engines: {
        jade: Jade,
      },
      path: Path.join(__dirname, 'server/web/views'),
    });

    // Static Assets Routes
    server.route({
      method: 'GET',
      path: '/public/{param*}',
      handler: {
        directory: {
          path: Path.join(__dirname, 'public/'),
          listing: true,
        },
      },
    });

    server.route(webRoutes);
    server.route(apiRoutes);
  });
  next();
};

exports.register.attributes = {
  name: 'il-laundry-consumer-web',
};
