'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pitchs_schedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      start_date : {
        type: Sequelize.DATE,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pitchs_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pitchs'
          },
          key: 'id'
        }
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'statuses'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pitchs_schedules');
  }
};