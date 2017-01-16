import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import koa from 'koa';
const app  = new koa();

app.name = "SurprisesOfLife";
app.use(bodyParser());
app.use(json());
app.use(logger());

// middlewares
import * as exc from './middlewares/exception';
import * as con from './middlewares/constraint';
import * as auth from './middlewares/authentication';
app.use(con.constraint());
app.use(exc.forbidden());
app.use(auth.authenticate());

// routers
import home from './controllers/home';
import users from './controllers/users';
app.use(home.routes());
app.use(users.routes());

export default app;
