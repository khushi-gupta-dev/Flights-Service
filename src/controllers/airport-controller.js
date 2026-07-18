const { StatusCodes } = require("http-status-codes");

const { airportService } = require("../services");

const { successResponse , errorResponse } = require("../utils/common");
async function createAirport(req, res) {
  try {
    
    const airport = await airportService.createAirport({
        name : req.body.name,
        code: req.body.code,
        address: req.body.address,
        cityId: req.body.cityId,
        });

     successResponse.data = airport
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


async function getAirports(req, res) {
  try {
    const airports = await airportService.getAirports();
    successResponse.data = airports;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(errorResponse);
  }
}

async function getAirports(req, res) {
  try {
    const airports = await airportService.getAirports();
    successResponse.data = airports;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res
    .status(error.statusCode)
    .json(errorResponse);
}
}


async function getAirport(req, res) {
  try {
    const airport = await airportService.getAirport(req.params.id);
    successResponse.data = airport;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(errorResponse);
  }
}


async function destroyAirport(req, res) {
  try {
    const airport = await airportService.destroyAirport(req.params.id);
    successResponse.data = airport;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res  
      .status(error.statusCode)
      .json(errorResponse);    
  }        
}

async function updateAirport(req, res) {
  try {
    const airport = await airportService.updateAirport(req.params.id, req.body);
    successResponse.data = airport;
    return res
      .status(StatusCodes.OK)
      .json(successResponse);
  } catch (error) {
    errorResponse.error = error;
    return res
      .status(error.statusCode)
      .json(errorResponse);
  }
}

module.exports = {
  createAirport,
  getAirports,
  getAirport,
  destroyAirport,
  updateAirport
};
