const bodyParser = require('koa-bodyparser');
const json = require('koa-json');
const logger = require('koa-logger')
const Koa = require('koa');
const app = module.exports = new Koa();

app.name = "SurprisesOfLife";
app.use(bodyParser());
app.use(logger());
app.use(json());

//routers
const home = require('./controllers/home');
const users = require('./controllers/users');
app.use(home.routes());
app.use(users.routes());


if(!module.parent) app.listen(3000);
