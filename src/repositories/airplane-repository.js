const crudRepository = require("./crud-repository");
const {Airplane} = require("../models");
class airplaneRepository extends crudRepository {
    constructor() {
       super(Airplane); 
    }

    async someRawQuery() {
        // if some other query is needed which is not present in the crud repository then we can write that query here
    }

}

module.exports = airplaneRepository;