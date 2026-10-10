const {StatusCodes} = require("http-status-codes");
const { errorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    const body = req.body || {};
    if (!body.name) {
        errorResponse.message = "Something went wrong while creating airport"; 
    errorResponse.error = new AppError(["name not found in the incoming request"], StatusCodes.BAD_REQUEST); 
        return res
    .status(StatusCodes.BAD_REQUEST)
    .json(errorResponse);
   
    }
    

     if (!body.code) {
        errorResponse.message = "Something went wrong while creating airport"; 
    errorResponse.error = new AppError(["Airport code not found in the incoming request"], StatusCodes.BAD_REQUEST); 
        return res
    .status(StatusCodes.BAD_REQUEST)
    .json(errorResponse);
   
    }
    
     if (!body.cityId) {
        errorResponse.message = "Something went wrong while creating airport"; 
    errorResponse.error = new AppError(["City ID not found in the incoming request"], StatusCodes.BAD_REQUEST); 
        return res
    .status(StatusCodes.BAD_REQUEST)
    .json(errorResponse);
   
    }
    








    
   next();

}



module.exports = {
    validateCreateRequest,
    
}  
 
