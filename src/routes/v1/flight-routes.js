const express = require("express");
const { flightController } = require("../../controllers");
const { flightMiddlewares } = require("../../middlewares");
const router = express.Router();

//    /api/v1/flights      POST
router.post(
  "/",
  flightMiddlewares.validateCreateRequest,
  flightController.createFlight,
);


//    /api/v1/flights?trips=MUM-DEL      GET
router.get(
  "/",
  flightController.getAllFlights
);

module.exports = router;
