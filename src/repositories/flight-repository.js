const crudRepository = require("./crud-repository");
const { flights } = require("../models");
class flightRepository extends crudRepository {
    constructor() {
         super(flights); 
    }

    async someRawQuery() {
        // if some other query is needed which is not present in the crud repository then we can write that query here
    }

}

module.exports = flightRepository;