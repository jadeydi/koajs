const router = require('koa-router')();

router.get('/users', function(ctx) {
  ctx.body = {page: 'users'};
})

module.exports = router;
