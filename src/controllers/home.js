import routers from 'koa-router';
const router = routers();

router.get('/', async (ctx) => {
  let body = {page: 'index'};
  ctx.body = body;
});

module.exports = router;
