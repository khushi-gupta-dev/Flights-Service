const crudRepository = require("./crud-repository");
const {City} = require("../models");
class cityRepository extends crudRepository {
    constructor() {
       super(City); 
    }

    async someRawQuery() {
        // if some other query is needed which is not present in the crud repository then we can write that query here
    }

}

module.exports = cityRepository;