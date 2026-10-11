const { Sequelize } = require("sequelize");

const crudRepository = require("./crud-repository");
const { flights, Airplane, Airport, City } = require("../models");
const db = require("../models");
const AppError = require("../utils/errors/app-error");

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
      await db.sequelize.query(addRowLockOnFlights(), {
        replacements: { flightId },
        transaction,
      });

      const flight = await flights.findByPk(flightId, { transaction });
      if (!flight) {
        throw new AppError("The Flight you requested is not present", 404);
      }
      if (!Number.isInteger(Number(seats)) || Number(seats) < 1) {
        throw new AppError("Seats must be a positive whole number", 400);
      }
      if (dec !== false && dec !== 0 && Number(seats) > flight.totalSeats) {
        throw new AppError("Not enough seats available", 409);
      }

      const adjustment = { by: Number(seats), transaction };
      if (dec !== false && dec !== 0) {
        await flight.decrement("totalSeats", adjustment);
      } else {
        await flight.increment("totalSeats", adjustment);
      }
      await transaction.commit();
      return flight;
    } catch (error) {
      if (!transaction.finished) await transaction.rollback();
      throw error;
    }
  }

}

module.exports = flightRepository;
