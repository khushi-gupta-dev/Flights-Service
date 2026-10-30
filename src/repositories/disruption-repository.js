const { FlightDisruption, flights } = require("../models");
const AppError = require("../utils/errors/app-error");

class DisruptionRepository {
  async create(data) {
    try {
      return await FlightDisruption.create(data);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        const existing = await FlightDisruption.findOne({ where: { idempotencyKey: data.idempotencyKey } });
        if (existing) return existing;
      }
      throw error;
    }
  }

  async getAll() {
    return FlightDisruption.findAll({
      order: [["createdAt", "DESC"]],
      include: [{ model: flights, as: "flight", required: true }],
    });
  }

  async get(id) {
    const disruption = await FlightDisruption.findByPk(id, {
      include: [{ model: flights, as: "flight", required: true }],
    });
    if (!disruption) throw new AppError("The disruption was not found", 404);
    return disruption;
  }

  async updateStatus(id, status) {
    const disruption = await FlightDisruption.findByPk(id);
    if (!disruption) throw new AppError("The disruption was not found", 404);
    await disruption.update({ status });
    return disruption;
  }
}

module.exports = DisruptionRepository;
