'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UserSchedule.init({
    users_id: {
      type: DataTypes.INTEGER,
    },
    pitches_schedules_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'UserSchedule',
    timestamps: false,
    tableName: 'users_has_schedules'
  });
  return UserSchedule;
};