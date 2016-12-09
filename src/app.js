const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger');
const koa = require('koa');
const app  = new koa();

app.name = "SurprisesOfLife";
app.use(bodyParser());
app.use(logger());
app.use(json());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    ctx.status = 403;
    ctx.body = {hello: "world"};
  }
});

//routers
const home = require('./controllers/home');
const users = require('./controllers/users');
app.use(home.routes());
app.use(users.routes());

export default app;
