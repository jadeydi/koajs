var app = require('../../index');
var request = require('supertest').agent(app.listen());

describe('Server', function() {
  it('should got 200 and say "Hello World"', function(done) {
    request
    .get('/')
    .expect(200)
    .expect('Hello World!', done);
  });
});
