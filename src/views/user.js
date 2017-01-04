module.exports = {
  renderUser: function(user) {
    return {id: user.id, name: user.name()};
  },

  renderAccount: function(user) {
    return {id: user.id, username: user.username, email: user.email, nickname: user.nickname, authentication_token: user.authenticationToken};
  },
}
