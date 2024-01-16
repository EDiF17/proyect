'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pitch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Pitch.belongsTo(models.Country, {
          foreignKey: 'countries_id',
          as: 'countries'
    });
    }
  }
  Pitch.init({
    name: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  phone: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  hours_price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  countries_id: {
    type: DataTypes.INTEGER,
  }
},
  {
    sequelize,
    modelName: 'Pitch',
  });
  return Pitch;
};