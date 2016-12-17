import app from '../../build/app';
import request from 'supertest';
const res = request.agent(app.listen());

describe('Server', function() {
  before(function () {
    return require('../../models').sequelize.sync({force: true});
  });

  describe('GET /users', function() {
    it('should got 200 and {"page": "users"}', function(done) {
      res
        .get('/users')
        .set('x-koa-api-token', '8371f1f8c7ed47444ab37c14c4eae9c3')
        .expect(200)
        .expect('{\n  "page": "users"\n}', done);
    });
  });

  describe('POST /users', function() {
    it('should got 201', function(done) {
      res
        .post('/users')
        .set('x-koa-api-token', '8371f1f8c7ed47444ab37c14c4eae9c3')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send('{"username":"Fo", "email": "Fo", "password": "Password"}')
        .expect(403)
        .expect('{\n  "hello": "world"\n}', done);
    });
  });
});
