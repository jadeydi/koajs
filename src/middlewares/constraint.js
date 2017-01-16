import error from '../views/error';

const apiTokens = {
  "8371f1f8c7ed47444ab37c14c4eae9c3": {platform: "Server"},
  "fa4da88136b4a3eed20179f7ec6a658d": {platform: "Android"},
  "d89e69055e5f1e1015bcc315c2e46d75": {platform: "iOS"},
};

const constraint = () => {
  return async (ctx, next) => {
    let token = !apiTokens[ctx.headers['x-koa-api-token']];
    if (token) {
      error.renderUnauthorized(ctx);
    } else {
      ctx.apiToken = apiTokens[ctx.headers['x-koa-api-token']]
      await next();
    }
  }
};

export {constraint};
