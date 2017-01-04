import routers from 'koa-router';
import models from '../../models';
import userView from '../views/user';

const router = routers();
const User = models.user;

router
.get('/acccount', async (ctx) => {
  ctx.body = user.renderAccount(ctx.current_user);
})
.post('/users', async (ctx) => { // Todo change route name
  const user = await User.create(ctx.request.body).then(function(user) {
    return user
  }).catch(function(err) {
    throw err;
  });
  ctx.body = userView.renderAccount(user);
});

module.exports = router;
