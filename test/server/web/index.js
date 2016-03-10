const Lab = require('lab');
const Code = require('code');
const composer = require('../../../server.js');

const lab = exports.lab = Lab.script();
let request;
let server;

lab.beforeEach((done) => {
  composer((err, composedServer) => {
    if (err) {
      throw err;
    }
    server = composedServer;
    done();
  });
});


lab.experiment('Home Page View', () => {
  lab.beforeEach((done) => {
    request = {
      method: 'GET',
      url: '/',
    };
    done();
  });

  lab.test('home page renders properly', (done) => {
    server.inject(request, (response) => {
      Code.expect(response.result).to.match(/Web Laundry - Interactive Labs/i);
      Code.expect(response.statusCode).to.equal(200);
      done();
    });
  });
});
