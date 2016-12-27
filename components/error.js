const error = {
  InvalidError: function(sequelize, field) {
    return new sequelize.ValidationErrorItem(field + ' invalid', 'Invalid', field, '11001')
  },

  UniqueError: function(sequelize, field) {
    return new sequelize.ValidationErrorItem(field + ' already exists', 'Already Exists', field, '11002')
  },

  Extract: function(err) {
    let fields = err.errors.map(function(obj) {
      return obj.path
    });
    return fields.sort()
  },
};

module.exports = error;
