import routers from 'koa-router';
import models from '../../models';
const router = routers();
const User = models.user;

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
