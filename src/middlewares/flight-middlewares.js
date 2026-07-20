const { StatusCodes } = require("http-status-codes");
const { errorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
  if (!req.body.flightNumber) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["flight number not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.airplaneId) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["Airplane ID not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.departureAirportId) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["Departure airport ID not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.arrivalAirportId) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["Arrival airport ID not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.departureTime) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["Departure time not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.arrivalTime) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["Arrival time not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.price) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["Price not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  if (!req.body.totalSeats) {
    errorResponse.message = "Something went wrong while creating flight";
    errorResponse.error = new AppError(
      ["total seats not found in the incoming request"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(errorResponse);
  }

  next();
}

module.exports = {
  validateCreateRequest,
};
