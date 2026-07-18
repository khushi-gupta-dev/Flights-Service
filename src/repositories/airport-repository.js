const crudRepository = require("./crud-repository");
const {Airport} = require("../models");
class airportRepository extends crudRepository {
    constructor() {
       super(Airport); 
    }

    async someRawQuery() {
        // if some other query is needed which is not present in the crud repository then we can write that query here
    }

}

module.exports = airportRepository;