var json = require('koa-json');
var Koa = require('koa');
var app = module.exports = new Koa();
app.name = "SurprisesOfLife";
app.use(json());

var home = require('./controllers/home');

//routers
app.use(home.routes());


if(!module.parent) app.listen(3000);
