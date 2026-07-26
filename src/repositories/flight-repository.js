const { Sequelize } = require("sequelize");

const crudRepository = require("./crud-repository");
const { flights, Airplane, Airport } = require("../models");

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
        },
      ],
    });
    return response;
  }
}

module.exports = flightRepository;
