const Lab = require('lab');
const Code = require('code');
const composer = require('../server.js');
const lab = exports.lab = Lab.script();

lab.experiment('App', () => {
  lab.test('it composes a server', (done) => {
    composer((err, composedServer) => {
      Code.expect(composedServer).to.be.an.object();
      done(err);
    });
  });
});
