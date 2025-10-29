'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('games', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      level: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      skips: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      status: {
        type: Sequelize.ENUM('S', 'W', 'L', 'F'),
        allowNull: false,
        defaultValue: 'S',
        comment: 'S = iniciado, W = vencido, L = perdido, F = encerrado',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('games');
  }
};