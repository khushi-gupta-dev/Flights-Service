const { StatusCodes } = require("http-status-codes");

const { flightService } = require("../services");

const { successResponse, errorResponse } = require("../utils/common");


/**
 * POST: /flights
 *req-body {
 * flightNumber: "AI-202",
 * airplaneId: 1,
 * departureAirportId: "JFK",
 * arrivalAirportId: "LAX",
 * departureTime: "2022-01-01T10:00:00.000Z",
 * arrivalTime: "2022-01-01T12:00:00.000Z",
 * price: 1000,
 * boardingGate: "A1",
 * totalSeats: 200
 * }
 */


async function createFlight(req, res) {
  try {
    
    const flight = await flightService.createFlight({
      flightNumber : req.body.flightNumber,
      airplaneId : req.body.airplaneId,
      departureAirportId : req.body.departureAirportId,
      arrivalAirportId : req.body.arrivalAirportId,
      departureTime : req.body.departureTime,
      arrivalTime : req.body.arrivalTime,
        price: req.body.price,
    boardingGate: req.body.boardingGate,
    totalSeats: req.body.totalSeats  
        });

     successResponse.data = flight
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


async function getAllFlights(req, res) {
    try {
        const flights = await flightService.getAllFlights(req.query);
        successResponse.data = flights;
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
  createFlight,
  getAllFlights
};

