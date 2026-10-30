const amqp = require("amqplib");
const { randomUUID } = require("crypto");

const exchange = process.env.RABBITMQ_EVENTS_EXCHANGE || "skylink.events";
const rabbitUrl = process.env.RABBITMQ_URL || "amqp://localhost";

async function publishDisruptionCreated(disruption) {
  const connection = await amqp.connect(rabbitUrl);
  try {
    const channel = await connection.createConfirmChannel();
    await channel.assertExchange(exchange, "topic", { durable: true });
    const event = {
      eventId: randomUUID(),
      eventType: "disruption.created",
      occurredAt: new Date().toISOString(),
      correlationId: `disruption-${disruption.id}`,
      producer: "flights-service",
      payload: disruption.toJSON(),
    };
    channel.publish(exchange, "disruption.created", Buffer.from(JSON.stringify(event)), {
      contentType: "application/json",
      persistent: true,
    });
    await channel.waitForConfirms();
    return event;
  } finally {
    await connection.close();
  }
}

module.exports = { publishDisruptionCreated };
