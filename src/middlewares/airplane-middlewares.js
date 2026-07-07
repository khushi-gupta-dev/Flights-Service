const {StatusCodes} = require("http-status-codes");
const { errorResponse } = require("../utils/common");

const AppError = require("../utils/errors/app-error");
function validateCreateRequest(req, res, next) {
    if (!req.body.modelNumber) {
        errorResponse.message = "Something went wrong while creating airplane"; 
    errorResponse.error = new AppError(["modelNumber not found in the incoming request"], StatusCodes.BAD_REQUEST); 
        return res
    .status(StatusCodes.BAD_REQUEST)
    .json(errorResponse);
   
}
   next();

}
module.exports = {
    validateCreateRequest
}  
 