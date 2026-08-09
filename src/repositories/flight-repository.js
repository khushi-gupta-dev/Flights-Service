const { Sequelize } = require("sequelize");

const crudRepository = require("./crud-repository");
const { flights, Airplane, Airport, City } = require("../models");
const db = require("../models");

const { addRowLockOnFlights } = require("./queries");


class flightRepository extends crudRepository {
  constructor() {
    super(flights);
  }

  async getAllFlights(filter, sort) {
    const response = await flights.findAll({
      where: filter,
      order: sort,
      include: [
        {
          as: "airplaneDetail",
          model: Airplane,
          required: true,
        },
        {
          model: Airport,
          required: true,
          as: "departureAirport",

          on: {
            col1: Sequelize.where(
              Sequelize.col("flights.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code"),
            ),
          },
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
        {
          model: Airport,
          required: true,
          as: "arrivalAirport",
          on: {
            col1: Sequelize.where(
              Sequelize.col("flights.arrivalAirportId"),
              "=",
              Sequelize.col("arrivalAirport.code"),
            ),
          },
          include: [
            {
              model: City,
              required: true,
            },
          ],
        },
      ],
    });
    return response;
  }

  async updateRemainingSeats(flightId, seats, dec = true) {
 const transaction = await db.sequelize.transaction();
    try {
      await db.sequelize.query(addRowLockOnFlights(flightId));        // raw query to put a row lock 



    const flight = await flights.findByPk(flightId);
    if (dec==true) {
      await flight.decrement("totalSeats", { by: seats }, { transaction: transaction });
     
    }
    else {
     await flight.increment("totalSeats", { by: seats }, { transaction: transaction });
  
    }
   await transaction.commit();
    return flight;
  }catch(error) {
            await transaction.rollback();
            throw error;
        }
  }

}

module.exports = flightRepository;
