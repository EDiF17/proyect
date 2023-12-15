'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Country, {
        foreignKey: 'countries_id',
        as: 'countries'
    });

      User.belongsTo(models.Position, {
      foreignKey: 'positions_id',
      as: 'positions'
  });

    User.belongsTo(models.Role, {
    foreignKey: 'roles_id',
    as: 'roles'
});

    }
  }
  User.init({
  first_name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  last_name: {
    type: DataTypes.TEXT,
    allowNull: false
},
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  phone: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  age: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  genre: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  countries_id: {
    type: DataTypes.INTEGER,
  },
  positions_id: {
    type: DataTypes.INTEGER,
  },
  roles_id: {
    type: DataTypes.INTEGER,
  }
},
  {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10);
      }
    }
  });
  return User;
};