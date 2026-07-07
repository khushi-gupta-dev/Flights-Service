const express = require("express");
const {airplaneController} = require("../../controllers");
const {airplaneMiddlewares} = require("../../middlewares");
const router = express.Router();

//    /api/v1/airplanes      POST
router.post(
    "/" , 
    airplaneMiddlewares.validateCreateRequest,
     airplaneController.createAirplane);

module.exports = router;