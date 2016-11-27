var json = require('koa-json');
var route = require('koa-route');
var Koa = require('koa');
var app = module.exports = new Koa();
app.name = "SurprisesOfLife";
app.use(json());

var home = require('./controllers/home');

//routes
app.use(route.get('/', home.index));


if(!module.parent) app.listen(3000);
