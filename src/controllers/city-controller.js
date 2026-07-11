const { StatusCodes } = require("http-status-codes");

const { cityService } = require("../services");

const { successResponse, errorResponse } = require("../utils/common");


// POST: /cities
// req-body {
//   name: "New York"
// }
async function createCity(req, res) {
  try {
    
    const city = await cityService.createCity({
        name : req.body.name,
      
        });

     successResponse.data = city
    return res
    .status(StatusCodes.CREATED)
    .json(successResponse);
  } catch (error) {
    errorResponse.error = error;
  return  res
    .status(error.statusCode)
    .json(errorResponse);
}
}


async function destroyCity(req, res) {
  try {
    const response = await cityService.destroyCity(req.params.id);
    successResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(errorResponse);
  }
}

async function updateCity(req, res) {
  try {
    const response = await cityService.updateCity(req.params.id, req.body);
    successResponse.data = response;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    console.log(error);
    errorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(errorResponse);
  }
}

module.exports = { 
    createCity,
    destroyCity,
    updateCity
}