import models from '../../models';

const User = models.user;

const whiteList = [
  ["GET", "^/$"],
  ["POST", "^/account"],
]

function valid(ctx) {
  return whiteList.some((item) => {
    return item[0] == ctx.method && (new RegExp(item[1])).test(ctx.path)
  });
}

const authenticate = () => {
  return async (ctx, next) => {
    if (valid(ctx)) {
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
        ctx.status = 401;
        ctx.body = {error: {code: 10401, data: []}};
      }
    }
  }
}

export {authenticate}
