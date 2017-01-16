import routers from 'koa-router';
import models from '../../models';
import views from '../views/user';
import error from '../views/error';

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
    error.renderNotFound(ctx);
    return
  }
  user.password = body.password
  if (!user.validPassword()) {
    error.renderUnauthorized(ctx);
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
})
.put('/account', async(ctx) => {
  const user = await ctx.current_user.update(ctx.request.body).then(function(user) {
    return user
  }).catch((err) => {
    throw err;
  });
  ctx.body = views.renderAccount(user);
});

module.exports = router;
