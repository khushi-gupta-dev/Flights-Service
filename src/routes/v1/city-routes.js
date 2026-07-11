const express = require("express");
const { cityController } = require("../../controllers");
const { cityMiddlewares } = require("../../middlewares");
const router = express.Router();


//    /api/v1/cities     POST
router.post(
    "/" , 
    cityMiddlewares.validateCreateRequest,
     cityController.createCity);


//    /api/v1/airplanes      GET
// router.get(
//     "/" ,
//     cityController.getCities);


    //    /api/v1/airplanes/:id      GET
   
// router.get(
//     "/:id",

//     cityController.getCity
// )


 router.delete(
    "/:id",
     cityController.destroyCity
)
 
router.patch(
    "/:id",
    cityController.updateCity
)

module.exports = router;