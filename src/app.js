import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import koa from 'koa';
const app  = new koa();

app.name = "SurprisesOfLife";
app.use(bodyParser());
app.use(logger());
app.use(json());

import * as exc from './middleware/exceptions';
import * as con from './middleware/constraints';
app.use(con.constraint());
app.use(exc.forbidden());

//routers
import home from './controllers/home';
import users from './controllers/users';
app.use(home.routes());
app.use(users.routes());

export default app;
