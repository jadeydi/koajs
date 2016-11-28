var app = require('../../server');
var request = require('supertest').agent(app.listen());

describe('Server', function() {
  it('should got 200 and {"page": "index"}', function(done) {
    request
    .get('/')
    .expect(200)
    .expect('{\n  "page": "index"\n}', done);
  });

  it('should got 200 and {"page": "users"}', function(done) {
    request
    .get('/users')
    .expect(200)
    .expect('{\n  "page": "users"\n}', done);
  });
});
