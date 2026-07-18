const express = require("express");
const { airportController } = require("../../controllers");
const { airportMiddlewares } = require("../../middlewares");
const router = express.Router();

//    /api/v1/airports      POST
router.post(
    "/" , 
    airportMiddlewares.validateCreateRequest,
     airportController.createAirport);

//    /api/v1/airports      GET
router.get(
    "/" , 
    airportController.getAirports);


    //    /api/v1/airports/:id      GET
   
router.get(
    "/:id",

    airportController.getAirport
)


router.delete(
    "/:id",
    airportController.destroyAirport
)   


router.patch(
    "/:id",

    airportController.updateAirport
)


module.exports = router;