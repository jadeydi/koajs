const router = require('koa-router')();
const User = require('../../models').user;
const errHandler = require('../../utils/error');

router.get('/users', async (ctx) => {
  const body = {page: 'users'};
  ctx.body = body;
}).post('/users', async (ctx) => {
  const user = await User.create(ctx.request.body).then(function(user) {
    return user
  }).catch(function(err) {
    throw err;
  });
  ctx.body = user;
});

module.exports = router;
