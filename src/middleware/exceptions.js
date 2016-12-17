const forbidden = function() {
  return async (ctx, next) => {
    try {
      await next();
    } catch(err) {
      ctx.status = 403;
      ctx.body = {hello: "world"};
    }
  }
};

export {forbidden};
