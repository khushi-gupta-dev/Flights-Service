const express = require("express");

const router = express.Router();
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes")
const airportRoutes = require("./airport-routes")
const flightRoutes = require("./flight-routes")

router.use("/flights" , flightRoutes);

router.use("/airports" , airportRoutes);
router.use("/airplanes" , airplaneRoutes);
router.use("/cities", cityRoutes);


module.exports = router;