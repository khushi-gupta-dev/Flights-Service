const { StatusCodes } = require("http-status-codes");
const { cityRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const cityRepo = new cityRepository();


async function createCity(data) { 
     try {
    const city = await cityRepo.create(data);
    return city;
     } catch (error) {
       console.log(error)
    if (error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });

      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }

    throw new AppError(
      "Cannot create a new city object",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
}


async function destroyCity(id) {

  try {
    const response = await cityRepo.destroy(id);
    return response;
  } catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The City you requested is not present",
        error.statusCode,
      );
    }
    throw new AppError(
      "Cannot delete the specified city",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
  
}


async function updateCity(id, data) {
  try {
    const response = await cityRepo.update(id, data);
    return response;
  }
  catch (error) {
    if (error.statusCode == StatusCodes.NOT_FOUND) {
      throw new AppError(
        "The City you requested to update is not present",
        error.statusCode,
      );
    }
    throw new AppError(
      "Cannot update the specified city",
      StatusCodes.INTERNAL_SERVER_ERROR,
    );

  }
}

module.exports = {
  createCity,
  destroyCity,
  updateCity
}