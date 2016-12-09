import app from '../../build/app';
import request from 'supertest';
const res = request.agent(app.listen());

describe('Server', function() {
  before(function () {
    return require('../../models').sequelize.sync({force: true});
  });

  describe('POST /users', function() {
    it('should got 201', function(done) {
      res
        .post('/users')
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send('{"username":"Fo", "email": "Fo", "password": "Password"}')
        .expect(403)
        .expect('{\n  "hello": "world"\n}', done);
    });
  });
});
