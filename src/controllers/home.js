import routers from 'koa-router';
const router = routers();

router.get('/', async (ctx) => {
  ctx.body = {};
});

module.exports = router;
