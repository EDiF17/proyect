'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Country.hasMany(models.User, {
          foreignKey: 'countries_id',
          as: 'users'
    });
      Country.hasMany(models.Pitch, {
        foreignKey: 'countries_id',
        as: 'pitchs'
  });
    }
  }
  Country.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Country',
    timestamps: false
  });
  return Country;
};