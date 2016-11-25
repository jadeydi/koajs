var app = require('../../server');
var request = require('supertest').agent(app.listen());

describe('Server', function() {
  it('should got 200 and {"page": "index"}', function(done) {
    request
    .get('/')
    .expect(200)
    .expect('{\n  "page": "index"\n}', done);
  });
});
