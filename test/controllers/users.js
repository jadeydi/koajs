import app from '../../build/app';
import req from 'supertest';
const request = req.agent(app.listen());
import {token} from '../config';

describe('controllers/users', function() {
  before(function () {
    return require('../../models').sequelize.sync({force: true});
  });

  describe('POST /account', function() {
    it('should got 403', function(done) {
      request
        .post('/account')
        .set(token)
        .set('Accept', 'application/json')
        .set('Content-Type', 'application/json')
        .send('{"username":"Fo", "email": "Fo", "password": "Password"}')
        .expect(403, done);
    });
  });
});
