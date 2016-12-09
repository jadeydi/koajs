const router = require('koa-router')();

router.get('/', async (ctx) => {
  const body = {page: 'index'};
  ctx.body = body;
});

module.exports = router;
