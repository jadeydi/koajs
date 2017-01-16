module.exports = {
  renderNotFound: function(ctx) {
    ctx.body = {error: {code: 10404, data: []}};
  },

  renderUnauthorized: function(ctx) {
    ctx.body = {error: {code: 10401, data: []}};
  },

  renderForbidden: function(ctx) {
    ctx.body = {error: {code: 10403, data: []}};
  },
}
