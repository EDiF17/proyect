'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserSchedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserSchedules.belongsToMany(models.User, {
        foreignKey: 'users_id',
        as: 'users'
    });

    UserSchedules.belongsToMany(models.PitchsSchedules, {
      foreignKey: 'pitchs_schedules_id',
      as: 'pitchs_schedules'
  });


  // EN CASO DE ESTAR CORRECTO, FALTARIA AGREGAR ESTAS RELACIONES EN LOS MODELOS DE PITCHSSCHEDULES Y USER
    
  // EN CASO DE ESTAR CORRECTO, FALTARIA AGREGAR ESTAS RELACIONES EN LOS MODELOS DE PITCHSSCHEDULES Y USER
  
  // EN CASO DE ESTAR CORRECTO, FALTARIA AGREGAR ESTAS RELACIONES EN LOS MODELOS DE PITCHSSCHEDULES Y USER
  
}
  }
  UserSchedules.init({
    users_id: {
      type: DataTypes.INTEGER,
    },
    pitchs_schedules_id: {
      type: DataTypes.INTEGER,
    }
  },
    {
    sequelize,
    modelName: 'UserSchedules',
    timestamps: false
  });
  return UserSchedules;
};