'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Status.hasMany(models.PitchsSchedules, {
        foreignKey: 'status_id',
        as: 'status'
  });
    }
  }
  Status.init({
    name: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Status',
    timestamps: false
  });
  return Status;
};