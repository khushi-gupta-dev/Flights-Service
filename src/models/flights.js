'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
this.belongsTo(models.Airport, {
        foreignKey: 'departureAirportId',
        
      });
      this.belongsTo(models.Airport, {
        foreignKey: 'arrivalAirportId',
      
      });

      this.belongsTo(models.Airplane, {
        foreignKey: 'airplaneId',
    
      });
      
      // define association here
    }
  }
  flights.init({
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    }, 
    flightNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    airplaneId:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departureAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    arrivalAirportId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    arrivalTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    departureTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    boardingGate: {
      type: DataTypes.STRING
    },
    totalSeats: {            // total remaining seats 
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {
    sequelize,
    modelName: 'flights',
  });
  return flights;
};