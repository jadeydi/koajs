import models from '../../models';
import error from '../views/error';

const User = models.user;

const whiteList = [
  ["GET", "^/$"],
  ["POST", "^/session$"],
  ["POST", "^/account$"],
]

const authenticate = () => {
  return async (ctx, next) => {
    if (verify(ctx)) {
      await next();
    } else {
      const user = await User.findOne({where: {authenticationToken: ctx.headers['x-koa-user-token']}}).then((user) => {
        return user
      }).catch((err) => {
        throw err;
      })
      if (!!user) {
        ctx.current_user = user;
        await next();
      } else {
        error.renderUnauthorized(ctx);
      }
    }
  }
}

function verify(ctx) {
  return whiteList.some((item) => {
    return item[0] == ctx.method && (new RegExp(item[1])).test(ctx.path)
  });
}

export {authenticate}
