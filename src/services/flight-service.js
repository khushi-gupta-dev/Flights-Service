const { StatusCodes } = require("http-status-codes");
const { flightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const compare= require("../utils/helpers/datetime-helper");
const flightRepo = new flightRepository();

async function createFlight(data) {
  try {
    if (compare.compareTime(data.departureTime, data.arrivalTime)) {                 
      throw new AppError(
        "Departure time must be less than arrival time",
        StatusCodes.BAD_REQUEST,
      );
    }
    const flight = await flightRepo.create(data);
    return flight;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new flight object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

module.exports = {
  createFlight,
};
