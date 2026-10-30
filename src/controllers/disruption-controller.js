const { StatusCodes } = require("http-status-codes");
const disruptionService = require("../services/disruption-service");
const { successResponse, errorResponse } = require("../utils/common");

function sendError(res, error) {
  errorResponse.error = error;
  return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json(errorResponse);
}

async function createDisruption(req, res) {
  try {
    const disruption = await disruptionService.createDisruption({
      ...req.body,
      createdBy: req.headers["x-user-id"] || req.headers["x-access-token"] || "admin",
    });
    successResponse.data = disruption;
    return res.status(StatusCodes.CREATED).json(successResponse);
  } catch (error) {
    return sendError(res, error);
  }
}

async function getDisruptions(req, res) {
  try {
    successResponse.data = await disruptionService.getDisruptions();
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    return sendError(res, error);
  }
}

async function getDisruption(req, res) {
  try {
    successResponse.data = await disruptionService.getDisruption(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    return sendError(res, error);
  }
}

async function retryDisruption(req, res) {
  try {
    successResponse.data = await disruptionService.retryDisruption(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    return sendError(res, error);
  }
}

async function cancelDisruption(req, res) {
  try {
    successResponse.data = await disruptionService.cancelDisruption(req.params.id);
    return res.status(StatusCodes.OK).json(successResponse);
  } catch (error) {
    return sendError(res, error);
  }
}

module.exports = { createDisruption, getDisruptions, getDisruption, retryDisruption, cancelDisruption };
