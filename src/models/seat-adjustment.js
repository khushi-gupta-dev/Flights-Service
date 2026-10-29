'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SeatAdjustment extends Model {}

  SeatAdjustment.init({
    operationId: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    flightId: { type: DataTypes.INTEGER, allowNull: false },
    seats: { type: DataTypes.INTEGER, allowNull: false },
    decrement: { type: DataTypes.BOOLEAN, allowNull: false },
    compensatesOperationId: { type: DataTypes.STRING(160), allowNull: true },
    applied: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  }, { sequelize, modelName: 'SeatAdjustment' });

  return SeatAdjustment;
};
