'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users_has_schedules', {

      users_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        }
      },
      pitches_schedules_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pitches_schedules'
          },
          key: 'id'
        }
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users_has_schedules');
  }
};