const forbidden = function() {
  return async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      ctx.status = 403;
      ctx.body = {error: {code: 11000, data: err.errors}};
    }
  }
};

export {forbidden};
