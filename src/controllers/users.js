const router = require('koa-router')();
const User = require('../../models').user;
const errHandler = require('../../utils/error');

router.get('/users', async (ctx) => {
  let body = {page: 'users'};
  ctx.body = body;
}).post('/users', async (ctx) => {
  let user = await User.create(ctx.request.body).then(function(user) {
    return user
  }).catch(function(err) {
    throw err;
  });
  ctx.body = user;
});

module.exports = router;
