const { StatusCodes } = require("http-status-codes");
const { airportRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const airportRepo = new airportRepository();

async function createAirport(data) {
  try {
    const airport = await airportRepo.create(data);
    return airport;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new airport object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirports() {
  try {
    const airports = await airportRepo.getAll();
    return airports;
  }
  catch (error) {
   
    
    throw new AppError(
      "Cannot fetch data of all the airports",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function getAirport(id) {
  try {
    const airport = await airportRepo.get(id);
    
    return airport;
  } catch (error) {
     if (error.statusCode == StatusCodes.NOT_FOUND) {
    throw new AppError(
      "The Airport you requested is not present",
      error.statusCode,
    );
  }
    throw new AppError(
      "Cannot fetch data of the specified airport",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}

async function destroyAirport(id) {
  try {
    const response = await airportRepo.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport you requested is not present",
        error.statusCode,
      );
    }
    throw new AppError(
      "Cannot delete the specified airport",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}


async function updateAirport(id, data) {
  try {
    const airports = await airportRepo.update(id, data);
    return airports;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The Airport you requested is not present",
        error.statusCode,
      );
    } 
        throw new AppError(
      "Cannot update the specified airport",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}
module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport         
};
