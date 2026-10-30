const express = require("express");
const controller = require("../../controllers/disruption-controller");

const router = express.Router();

router.post("/", controller.createDisruption);
router.get("/", controller.getDisruptions);
router.get("/:id", controller.getDisruption);
router.post("/:id/retry", controller.retryDisruption);
router.post("/:id/cancel", controller.cancelDisruption);

module.exports = router;
