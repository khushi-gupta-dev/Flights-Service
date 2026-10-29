# Flights Service

Flights Service (default port `3000`) owns cities, airports, aircraft, flights, search, and remaining-seat inventory. Gateway paths use the `/flightsService` prefix; service routes are mounted at `/api/v1`.

## Routes

- Cities: `GET|POST /api/v1/cities`, `PATCH|DELETE /api/v1/cities/:id`.
- Airports and airplanes: `GET|POST /api/v1/{airports|airplanes}`, `GET|PATCH|DELETE /api/v1/{airports|airplanes}/:id`.
- Flights: `GET|POST /api/v1/flights`, `GET /api/v1/flights/:id`, `PATCH /api/v1/flights/:id/seats`.
- Search parameters: `trips` (`AAA-BBB`), `price` (`min-max`, or minimum only), `travellers`, `tripDate` (`YYYY-MM-DD`), and `sort` (for example `price_ASC,departureTime_DESC`). The frontend hides departures at or before the current time.

The gateway allows catalogue reads and restricts mutations to admins. `flights.totalSeats` stores remaining seats. Seat adjustments use a row lock in a database transaction; decrements reject requests exceeding current inventory.

## Run

Configure `PORT` and the development database in `src/config/config.json`, apply Sequelize migrations, and run `npm run dev`.
