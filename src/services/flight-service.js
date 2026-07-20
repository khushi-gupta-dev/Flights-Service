const { StatusCodes } = require("http-status-codes");
const { flightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const compare = require("../utils/helpers/datetime-helper");

const {Op} = require("sequelize");
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

async function getAllFlights(query) {
  let customFilter = {};
    let sortFilter = [];
  //trips = MUM-DEL

    if (query.trips) {
        [departureAirportId, arrivalAirportId] = query.trips.split("-");

        if (!departureAirportId || !arrivalAirportId) {
            throw new AppError("Trips parameter is invalid", StatusCodes.BAD_REQUEST);
        }

        // validation for departure and arrival airport id should not be same
        if (departureAirportId == arrivalAirportId) {
            throw new AppError(
                "Departure and Arrival airport cannot be same",
                StatusCodes.BAD_REQUEST,
            );
        }
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    
    



    if (query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 200000 : maxPrice)],
        }
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers,
        }
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + " 23:59:59"],
        }
    }

    if (query.sort) {
        const params = query.sort.split(",");
        const sortFilters = params.map((param) => param.split("_"));
        sortFilter = sortFilters;

    }

    try {
      const flights = await flightRepo.getAllFlights(customFilter , sortFilter);
      return flights;
    } catch (error) {
      throw new AppError(
        "Cannot fetch data of all the flights",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    
    }
}
module.exports = {
  createFlight,
  getAllFlights,
};
