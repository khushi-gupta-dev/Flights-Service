'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SeatAdjustments', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      operationId: { type: Sequelize.STRING(160), allowNull: false, unique: true },
      flightId: { type: Sequelize.INTEGER, allowNull: false },
      seats: { type: Sequelize.INTEGER, allowNull: false },
      decrement: { type: Sequelize.BOOLEAN, allowNull: false },
      compensatesOperationId: { type: Sequelize.STRING(160), allowNull: true },
      applied: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('SeatAdjustments');
  },
};
