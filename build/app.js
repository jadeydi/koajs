'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _exceptions = require('./middleware/exceptions');

var exc = _interopRequireWildcard(_exceptions);

var _constraints = require('./middleware/constraints');

var con = _interopRequireWildcard(_constraints);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

app.name = "SurprisesOfLife";
app.use((0, _koaBodyparser2.default)());
app.use((0, _koaLogger2.default)());
app.use((0, _koaJson2.default)());

app.use(con.constraint());
app.use(exc.forbidden());

//routers
var home = require('./controllers/home');
var users = require('./controllers/users');
app.use(home.routes());
app.use(users.routes());

exports.default = app;