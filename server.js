var json = require('koa-json');
var Koa = require('koa');
var app = module.exports = new Koa();
app.name = "SurprisesOfLife";
app.use(json());

var home = require('./controllers/home');
var users = require('./controllers/users');

//routers
app.use(home.routes());
app.use(users.routes());


if(!module.parent) app.listen(3000);
