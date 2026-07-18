'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      arrivalTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departureTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      departureAirportId: {
        type: Sequelize.STRING,
        allowNull: false,
          references: {
   model: 'Airports', 
  key: 'code', 
        },
        onDelete: 'CASCADE',

      },
      arrivalAirportId: {
        type: Sequelize.STRING,
        allowNull: false,
          references: {
   model: 'Airports', 
  key: 'code', 
        },
        onDelete: 'CASCADE',

      },
      flightNumber: {
        type: Sequelize.STRING,
        allowNull: false
      },
      airplaneId: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
   model: 'Airplanes', 
  key: 'id', 
        },
        onDelete: 'CASCADE',

        
      },
      boardingGate: {
        type: Sequelize.STRING
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('flights');
  }
};