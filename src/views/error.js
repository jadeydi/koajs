module.exports = {
  renderNotFound: function() {
    return {error: {code: 10404, data: []}};
  },

  renderUnauthorized: function() {
    return {error: {code: 10401, data: []}};
  }
}
