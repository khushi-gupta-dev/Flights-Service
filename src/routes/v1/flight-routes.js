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

router.get(
  "/:id",
  flightController.getFlight
);

//   /api/v1/flights/:id/seats      PATCH
router.patch(
  "/:id/seats",
  flightMiddlewares.validateUpdateSeatsRequest,
  flightController.updateSeats
);


module.exports = router;
