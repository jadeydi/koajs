const router = require('koa-router')();

router.get('/', function(ctx) {
  ctx.body = {page: 'index'};
})

module.exports = router;
