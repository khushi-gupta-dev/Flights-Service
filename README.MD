# Flights Service

Owns cities, airports, aircraft, flights, search, and remaining-seat inventory. Express routes are mounted under `/api/v1` and exposed by the gateway under `/flightsService`.

## Routes

- `GET /api/v1/cities`, `POST /api/v1/cities`; city update/delete use `PATCH|DELETE /:id`.
- `/api/v1/airports` and `/api/v1/airplanes`: GET/POST collection; GET/PATCH/DELETE by ID.
- `GET /api/v1/flights` supports `trips`, `price`, `travellers`, `tripDate`, and `sort`; `GET /:id`, `POST /`, and `PATCH /:id/seats`.

The gateway leaves catalog reads public and requires an admin token for writes. Seat adjustments use a transactional row lock; `totalSeats` represents remaining seats.

## Run

Configure `PORT` and the development database in `src/config/config.json`, apply migrations with Sequelize CLI, then `npm run dev` (default port 3000).
