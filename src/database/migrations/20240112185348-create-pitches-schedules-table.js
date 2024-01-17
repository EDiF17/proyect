'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pitches_schedules', {
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
      pitches_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'pitches'
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
    await queryInterface.dropTable('pitches_schedules');
  }
};