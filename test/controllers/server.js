import app from '../../build/app';
import request from 'supertest';
const res = request.agent(app.listen());

describe('Server', function() {
  describe('GET /', function() {
    it('should got 200 and {"page": "index"}', function(done) {
      res
        .get('/')
        .expect(200)
        .expect('{\n  "page": "index"\n}', done);
    });
  });

  describe('GET /users', function() {
    it('should got 200 and {"page": "users"}', function(done) {
      res
        .get('/users')
        .expect(200)
        .expect('{\n  "page": "users"\n}', done);
    });
  });
});
