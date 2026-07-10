const { StatusCodes } = require("http-status-codes");

const { airplaneService } = require("../services");

const { successResponse , errorResponse } = require("../utils/common");
// POST: /airplanes
// req-body {
//   modelNumber: "airbus320",
//   capacity: 200
// }
async function createAirplane(req, res) {
  try {
    
    const airplane = await airplaneService.createAirplane({
        modelNumber : req.body.modelNumber,
         capacity :req.body.capacity ,
        });

     successResponse.data = airplane
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


async function getAirplanes(req, res) {
  try {
    const airplanes  =  await airplaneService.getAirplanes();
    successResponse.data = airplanes
   return res
      .status(StatusCodes.OK)
    .json(successResponse);

  } catch (error) {
    errorResponse.error = error;
  return  res
    .status(error.statusCode)
    .json(errorResponse);
}
}
module.exports = {
  createAirplane,
  getAirplanes
};
