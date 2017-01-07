import routers from 'koa-router';
import models from '../../models';
import views from '../views/user';

const router = routers();
const User = models.user;

router
.get('/account', async (ctx) => {
  ctx.body = views.renderAccount(ctx.current_user);
})
.post('/account', async (ctx) => {
  const user = await User.create(ctx.request.body).then(function(user) {
    return user
  }).catch(function(err) {
    throw err;
  });
  ctx.body = views.renderAccount(user);
});

module.exports = router;
