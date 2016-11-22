var koa = require('koa');
var app = module.exports = koa();

//todo what's the meaning of *
app.use(function *(){
  this.body = 'Hello World!';
});

if(!module.parent) app.listen(3000);
