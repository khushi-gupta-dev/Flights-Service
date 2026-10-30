const { StatusCodes } = require("http-status-codes");
const { flights } = require("../models");
const AppError = require("../utils/errors/app-error");
const DisruptionRepository = require("../repositories/disruption-repository");
const { publishDisruptionCreated } = require("./disruption-event-service");

const repository = new DisruptionRepository();

async function createDisruption(data) {
  const flight = await flights.findByPk(data.flightId);
  if (!flight) throw new AppError("Choose an existing flight.", StatusCodes.BAD_REQUEST);
  if (new Date(data.effectiveAt).toString() === "Invalid Date") {
    throw new AppError("Effective time must be a valid date.", StatusCodes.BAD_REQUEST);
  }
  if (data.type === "delay" && (!Number.isInteger(Number(data.delayMinutes)) || Number(data.delayMinutes) < 1)) {
    throw new AppError("Delay minutes must be a positive whole number.", StatusCodes.BAD_REQUEST);
  }

  const disruption = await repository.create({
    flightId: data.flightId,
    type: data.type,
    severity: data.severity,
    reason: data.reason,
    delayMinutes: data.type === "delay" ? Number(data.delayMinutes) : null,
    effectiveAt: data.effectiveAt,
    idempotencyKey: data.idempotencyKey,
    createdBy: String(data.createdBy),
  });

  if (disruption.status === "created") {
    try {
      await publishDisruptionCreated(disruption);
      await disruption.update({ status: "published" });
    } catch (error) {
      await disruption.update({ status: "failed" });
      throw new AppError("The disruption was saved but could not be published. Retry it after checking RabbitMQ.", StatusCodes.SERVICE_UNAVAILABLE);
    }
  }
  return disruption;
}

async function getDisruptions() {
  return repository.getAll();
}

async function getDisruption(id) {
  return repository.get(id);
}

async function retryDisruption(id) {
  const disruption = await repository.get(id);
  if (disruption.status !== "failed") {
    throw new AppError("Only failed disruptions can be retried.", StatusCodes.CONFLICT);
  }
  await publishDisruptionCreated(disruption);
  return repository.updateStatus(id, "published");
}

async function cancelDisruption(id) {
  const disruption = await repository.get(id);
  if (["cancelled", "published"].includes(disruption.status)) {
    throw new AppError("This disruption cannot be cancelled in its current state.", StatusCodes.CONFLICT);
  }
  return repository.updateStatus(id, "cancelled");
}

module.exports = { createDisruption, getDisruptions, getDisruption, retryDisruption, cancelDisruption };
