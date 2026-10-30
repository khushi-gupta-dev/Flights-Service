'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FlightDisruption extends Model {
    static associate(models) {
      this.belongsTo(models.flights, {
        foreignKey: 'flightId',
        as: 'flight',
      });
    }
  }

  FlightDisruption.init({
    flightId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('delay', 'cancellation', 'overbooking', 'airport_closure'),
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'critical'),
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    delayMinutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    effectiveAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('created', 'published', 'failed', 'cancelled'),
      allowNull: false,
      defaultValue: 'created',
    },
    idempotencyKey: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
    },
    createdBy: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'FlightDisruption',
  });

  return FlightDisruption;
};
