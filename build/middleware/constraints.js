"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var apiTokens = {
  "8371f1f8c7ed47444ab37c14c4eae9c3": { platform: "Server" },
  "fa4da88136b4a3eed20179f7ec6a658d": { platform: "Android" },
  "d89e69055e5f1e1015bcc315c2e46d75": { platform: "iOS" }
};

var constraint = function constraint() {
  var _this = this;

  return function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(ctx, next) {
      var token;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = !apiTokens[ctx.headers['x-koa-api-token']];

              if (!token) {
                _context.next = 5;
                break;
              }

              ctx.status = 401;
              _context.next = 8;
              break;

            case 5:
              ctx.apiToken = apiTokens[ctx.headers['x-koa-api-token']];
              _context.next = 8;
              return next();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.constraint = constraint;