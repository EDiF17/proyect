'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PitchSchedul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PitchSchedul.belongsTo(models.Status, {
        foreignKey: 'status_id',
        as: 'status'
    });
    }
  }
  PitchSchedul.init({
    start_date : {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE(6),
      allowNull: false
    },
    pitches_id: {
      type: DataTypes.INTEGER,
    },
    status_id: {
      type: DataTypes.INTEGER,
    }
},
    {
    sequelize,
    modelName: 'PitchSchedul',
    tableName: 'pitches_schedules'
});
  return PitchSchedul;
};