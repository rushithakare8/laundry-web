require('babel-register');

const Glue = require('glue');
const Manifest = require('./manifest');

const composeOptions = {
  relativeTo: __dirname,
};
const composer = Glue.compose.bind(Glue, Manifest.get('/'), composeOptions);

composer((err, server) => {
  if (err) {
    throw err;
  }
  server.start(() => {
    console.log(`Started the plot device on port ${server.info.port}, with PID ${process.pid}`);
  });
});

module.exports = composer;
