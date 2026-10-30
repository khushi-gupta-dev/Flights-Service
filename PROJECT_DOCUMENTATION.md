# Flights Service Documentation

Flights Service owns flight catalogue data, search, remaining seat inventory,
and simulator-generated disruption events.

## Runtime and ownership

- Default port: `3001`
- Route prefix: `/api/v1`
- Gateway prefix: `/flightsService`
- Database: MySQL through Sequelize
- Start: `npm run dev`
- External dependencies: RabbitMQ for disruption events

## Routes

- `GET|POST /api/v1/cities`
- `PATCH|DELETE /api/v1/cities/:id`
- `GET|POST /api/v1/airports`
- `GET|PATCH|DELETE /api/v1/airports/:id`
- `GET|POST /api/v1/airplanes`
- `GET|PATCH|DELETE /api/v1/airplanes/:id`
- `GET|POST /api/v1/flights`
- `GET /api/v1/flights/:id`
- `PATCH /api/v1/flights/:id/seats`
- `GET|POST /api/v1/disruptions`
- `GET /api/v1/disruptions/:id`
- `POST /api/v1/disruptions/:id/retry`
- `POST /api/v1/disruptions/:id/cancel`

Search query parameters:

- `trips=AAA-BBB`
- `price=min-max` or a minimum-only value
- `travellers=n`
- `tripDate=YYYY-MM-DD`
- `sort=price_ASC,departureTime_DESC`

## Inventory safety

`flights.totalSeats` is remaining inventory. Seat changes run in a database
transaction with row locking. Booking Service supplies stable operation IDs.
Repeated operations are no-ops; reusing an operation ID with different values
is rejected. A compensating release can create a tombstone before a delayed
hold arrives, preventing the delayed hold from reducing inventory later.

Apply the seat-adjustment migration before using operation-aware inventory:
`20261029120000-create-seat-adjustments`.

## Disruption simulator

The admin simulator validates an existing flight, disruption type, severity,
reason, effective time, and delay minutes when applicable. It stores an
idempotent disruption and publishes `disruption.created` to the
`skylink.events` topic exchange. Failed publication leaves status `failed`;
administrators can retry it. Apply
`20261030170000-create-flight-disruptions` first.

Required configuration:

```env
RABBITMQ_URL=amqp://localhost:5672
```

Phase 1 uses simulated disruptions. No live airline feed is integrated.

## Development

Configure the development database in `src/config/config.json`, apply all
Sequelize migrations, start RabbitMQ, and run `npm run dev`. Catalogue reads
may be public through the Gateway; mutations are admin-only at the Gateway.
