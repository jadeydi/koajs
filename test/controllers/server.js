import app from '../../build/app';
import req from 'supertest';
const request = req.agent(app.listen());
import {token} from '../config';

describe('Server', function() {
  describe('GET /', function() {
    it('should got 401', function(done) {
      request
        .get('/')
        .expect(401, done);
    });
  });

  describe('GET /', function() {
    it('should got 200 and {"page": "index"}', function(done) {
      request
        .get('/')
        .set(token)
        .expect(200)
        .expect('{\n  "page": "index"\n}', done);
    });
  });

  describe('GET /notfound', function() {
    it('should got 401', function(done) {
      request
        .get('/notfound')
        .set(token)
        .set('x-koa-api-token', '8371f1f8c7ed47444ab37c14c4eae9c3')
        .expect(401, done);
    });
  });
});
