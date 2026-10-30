'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('FlightDisruptions', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      flightId: { allowNull: false, type: Sequelize.INTEGER },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('delay', 'cancellation', 'overbooking', 'airport_closure'),
      },
      severity: {
        allowNull: false,
        type: Sequelize.ENUM('low', 'medium', 'high', 'critical'),
      },
      reason: { allowNull: false, type: Sequelize.STRING(500) },
      delayMinutes: { allowNull: true, type: Sequelize.INTEGER },
      effectiveAt: { allowNull: false, type: Sequelize.DATE },
      status: {
        allowNull: false,
        defaultValue: 'created',
        type: Sequelize.ENUM('created', 'published', 'failed', 'cancelled'),
      },
      idempotencyKey: { allowNull: false, unique: true, type: Sequelize.STRING(160) },
      createdBy: { allowNull: false, type: Sequelize.STRING(120) },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('FlightDisruptions');
  },
};
