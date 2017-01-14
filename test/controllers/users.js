import assert from 'assert';
import app from '../../build/app';
import req from 'supertest';
const request = req.agent(app.listen());
import * as header from '../config';
import models from '../../models';

describe('controllers/users', function() {
  before(function (done) {
    models.sequelize.sync({force: true}).then(function() {
      done();
    });
  });

  describe('sign_up and sign_in', function() {
    it('POST /account should got 403', function(done) {
      request
        .post('/account')
        .set(header.token)
        .set(header.json)
        .set(header.type)
        .send('{"username":"Fo", "email": "Fo", "password": "Password"}')
        .expect(403, done);
    });

    it('POST /account should got 200', function(done) {
      request
        .post('/account')
        .set(header.token)
        .set(header.json)
        .set(header.type)
        .send('{"username":"yuqlee", "email": "im.yuqlee@gmail.com", "password": "password"}')
        .expect(200)
        .expect(function(res) {
          assert.ok(res.body.hasOwnProperty('data'))
        })
        .end(done);
    });

    it('POST /session status 200 code 10404', function(done) {
      request
        .post('/session')
        .set(header.token)
        .set(header.json)
        .set(header.type)
        .send('{"identity": "wrong", "password": "password"}')
        .expect(200)
        .expect('{\n  "error": {\n    "code": 10404,\n    "data": []\n  }\n}', done);
    });

    it('POST /session status 200 code 10401', function(done) {
      request
        .post('/session')
        .set(header.token)
        .set(header.json)
        .set(header.type)
        .send('{"identity": "yuqlee", "password": "Pass"}')
        .expect(200)
        .expect('{\n  "error": {\n    "code": 10401,\n    "data": []\n  }\n}', done);
    });

    it('POST /session status 200', function(done) {
      request
        .post('/session')
        .set(header.token)
        .set(header.json)
        .set(header.type)
        .send('{"identity": "yuqlee", "password": "password"}')
        .expect(200)
        .expect(function(res) {
          assert.ok(res.body.hasOwnProperty('data'))
        })
        .end(done);
    });
  });
});
