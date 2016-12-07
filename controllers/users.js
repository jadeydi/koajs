const router = require('koa-router')();
const user = require('../models').user;

router.get('/users', function(ctx) {
  ctx.body = {page: 'users'};
}).post('/users', function(ctx) {
  ctx.status = 201;
  ctx.body = ctx.request.body;
})

module.exports = router;
