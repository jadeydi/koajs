import error from '../views/error';

const forbidden = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      error.renderForbidden(ctx);
    }
  }
};

export {forbidden};
