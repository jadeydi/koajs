import error from '../views/error';

const forbidden = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      ctx.status = 403;
      ctx.body = error.renderForbidden();
    }
  }
};

export {forbidden};
