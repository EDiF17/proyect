'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PitchsSchedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PitchsSchedules.belongsTo(models.Status, {
        foreignKey: 'status_id',
        as: 'status'
    });
    }
  }
  PitchsSchedules.init({
    start_date : {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    pitchs_id: {
      type: DataTypes.INTEGER,
    },
    status_id: {
      type: DataTypes.INTEGER,
    }
},
    {
    sequelize,
    modelName: 'PitchsSchedules',
});
  return PitchsSchedules;
};