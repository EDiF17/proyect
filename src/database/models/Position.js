'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Position.hasMany(models.User, {
          foreignKey: 'positions_id',
          as: 'users'
    });
    }
  }
  Position.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Position',
    timestamps: false
  });
  return Position;
};