'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Role.hasMany(models.User, {
            foreignKey: 'roles_id',
            as: 'users'
        });
    }
}
    Role.init({
    name: DataTypes.TEXT
}, {
    sequelize,
    modelName: 'Role',
    timestamps: false
});
    return Role;
};