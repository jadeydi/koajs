var app = require('../../server');
var request = require('supertest').agent(app.listen());

describe('Server', function() {
  describe('GET /', function() {
    it('should got 200 and {"page": "index"}', function(done) {
      request
        .get('/')
        .expect(200)
        .expect('{\n  "page": "index"\n}', done);
    });
  });

  describe('GET /users', function() {
    it('should got 200 and {"page": "users"}', function(done) {
      request
        .get('/users')
        .expect(200)
        .expect('{\n  "page": "users"\n}', done);
    });
  });

  describe('POST /users', function() {
    it('should got 201 and {"hello":"world", "foo": "bar"}', function(done) {
      request
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send('{"hello":"world", "foo": "bar"}')
        .expect(201)
        .expect('{\n  "hello": "world",\n  "foo": "bar"\n}', done);
    });
  });
});
