import routers from 'koa-router';
import models from '../../models';
import views from '../views/user';

const router = routers();
const User = models.user;

router
.post('/session', async(ctx) => {
  const body = ctx.request.body;
  const user = await User.findOne({where: {$or: [{username: body.identity}, {email: body.identity}]}}).then((user) => {
    return user
  }).catch((err) => {
    throw err;
  })
  if (!user) {
    ctx.body = {error: {code: 10404, data: []}}
    return
  }
  user.password
  if (!user.validPassword()) {
    ctx.body = {error: {code: 10401, data: []}}
    return
  }
  ctx.body = views.renderAccount(user);
})
.get('/account', async (ctx) => {
  ctx.body = views.renderAccount(ctx.current_user);
})
.post('/account', async (ctx) => {
  const user = await User.create(ctx.request.body).then((user) => {
    return user
  }).catch((err) => {
    throw err;
  });
  ctx.body = views.renderAccount(user);
});

module.exports = router;
