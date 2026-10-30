const express = require("express");

const router = express.Router();
const airplaneRoutes = require("./airplane-routes");
const cityRoutes = require("./city-routes")
const airportRoutes = require("./airport-routes")
const flightRoutes = require("./flight-routes")
const disruptionRoutes = require("./disruption-routes")

router.use("/flights" , flightRoutes);
router.use("/disruptions", disruptionRoutes);

router.use("/airports" , airportRoutes);
router.use("/airplanes" , airplaneRoutes);
router.use("/cities", cityRoutes);


module.exports = router;