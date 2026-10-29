const { Sequelize } = require("sequelize");

const crudRepository = require("./crud-repository");
const { flights, Airplane, Airport, City, SeatAdjustment } = require("../models");
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

  async updateRemainingSeats(flightId, seats, dec = true, operationId, compensatesOperationId) {
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
      const decrement = dec !== false && dec !== 0;
      if (operationId) {
        const prior = await SeatAdjustment.findOne({ where: { operationId }, transaction });
        if (prior) {
          if (Number(prior.flightId) !== Number(flightId) || Number(prior.seats) !== Number(seats) || prior.decrement !== decrement || prior.compensatesOperationId !== (compensatesOperationId || null)) {
            throw new AppError("This seat operation ID was already used for a different adjustment", 409);
          }
          await transaction.commit();
          return flight;
        }
      }
      let applied = true;
      if (decrement && compensatesOperationId) {
        const releaseIntent = await SeatAdjustment.findOne({
          where: { compensatesOperationId, decrement: false },
          transaction,
        });
        if (releaseIntent) applied = false;
      }
      if (!decrement && compensatesOperationId) {
        const hold = await SeatAdjustment.findOne({ where: { operationId: compensatesOperationId, decrement: true }, transaction });
        if (!hold?.applied) applied = false;
      }
      if (decrement && applied && Number(seats) > flight.totalSeats) {
        throw new AppError("Not enough seats available", 409);
      }

      if (applied) {
        const adjustment = { by: Number(seats), transaction };
        if (decrement) {
          await flight.decrement("totalSeats", adjustment);
        } else {
          await flight.increment("totalSeats", adjustment);
        }
      }
      if (operationId) {
        await SeatAdjustment.create({ operationId, flightId, seats: Number(seats), decrement, compensatesOperationId: compensatesOperationId || null, applied }, { transaction });
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
