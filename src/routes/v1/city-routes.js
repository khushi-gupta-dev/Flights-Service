const express = require("express");
const { cityController } = require("../../controllers");
const { cityMiddlewares } = require("../../middlewares");
const router = express.Router();


//    /api/v1/cities     POST
router.post(
    "/" , 
    cityMiddlewares.validateCreateRequest,
     cityController.createCity);




 router.delete(
    "/:id",
     cityController.destroyCity
)
 
router.patch(
    "/:id",
    cityController.updateCity
)

module.exports = router;