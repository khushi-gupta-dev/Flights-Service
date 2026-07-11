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



module.exports = {
  createCity
}