import app from '../../build/app';
import req from 'supertest';
const request = req.agent(app.listen());
import {token} from '../config';

describe('controllers/users', function() {
  before(function () {
    return require('../../models').sequelize.sync({force: true});
  });

  describe('GET /', function() {
    it('should got 200 and {"page": "users"}', function(done) {
      request
        .get('/')
        .set(token)
        .expect(200, done);
    });
  });

  describe('POST /users', function() {
    it('should got 403', function(done) {
      request
        .post('/users')
        .set(token)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send('{"username":"Fo", "email": "Fo", "password": "Password"}')
        .expect(403, done);
    });
  });
});
