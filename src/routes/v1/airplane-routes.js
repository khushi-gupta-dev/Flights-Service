const express = require("express");
const {airplaneController} = require("../../controllers");
const {airplaneMiddlewares} = require("../../middlewares");
const router = express.Router();

//    /api/v1/airplanes      POST
router.post(
    "/" , 
    airplaneMiddlewares.validateCreateRequest,
     airplaneController.createAirplane);

//    /api/v1/airplanes      GET
router.get(
    "/" , 
    airplaneController.getAirplanes);


    //    /api/v1/airplanes/:id      GET
   
router.get(
    "/:id",

    airplaneController.getAirplane
)


router.delete(
    "/:id",
    airplaneController.destroyAirplane
)   



module.exports = router;