const crudRepository = require("./crud-repository");
const { flights } = require("../models");

class flightRepository extends crudRepository {
    constructor() {
         super(flights); 
    }

   async  getAllFlights(filter , sort) { 
       const response = await flights.findAll({
           where: filter,
              order: sort
 });
    return response;
    }


}

module.exports = flightRepository;