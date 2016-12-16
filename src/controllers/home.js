const router = require('koa-router')();

router.get('/', async (ctx) => {
  let body = {page: 'index'};
  ctx.body = body;
});

module.exports = router;
