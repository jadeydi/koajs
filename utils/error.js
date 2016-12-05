const handler = {
  paths: function(err) {
    return err.errors.map(function(obj) {
      return obj.path
    });
  }
};

module.exports = handler;
