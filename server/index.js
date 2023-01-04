require('dotenv/config');
const express = require('express');
const pg = require('pg');
const path = require('path');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
const publicPath = path.join(__dirname, 'public');

// if (process.env.NODE_ENV === 'development') {
//   app.use(require('./dev-middleware')(publicPath));
// }

app.use(express.static(publicPath));
app.use(express.json());

app.use(staticMiddleware);

// app.get('/api/hello', (req, res) => {
//   res.json({ hello: 'world' });
// });

app.get('/api/vehicleData', (req, res, next) => {
  const sql = `
    select "vehicleId", "year", "make", "model", "licensePlate", "odometer", "notes"
    from "vehicle"
    `;
  db.query(sql)
    .then(result => {
      const vehicles = result.rows;
      res.status(200).json(vehicles);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/vehicleData', (req, res, next) => {
  const { year, make, model, licensePlate, odometer, notes } = req.body;
  if (!year || !make || !model || !licensePlate || !odometer || !notes) {
    throw new ClientError(400, 'Error: Year, make, model, license plate, odometer, and notes are required fields');
  } else if (isNaN(year) || isNaN(odometer)) {
    throw new ClientError(400, 'Error: Year and odometer must be a number, with no commas.');
  }
  const sql = `
    insert into "vehicle" ("year", "make", "model", "licensePlate", "odometer", "notes")
    values ($1, $2, $3, $4, $5, $6)
    returning *
    `;
  const params = [year, make, model, licensePlate, odometer, notes];
  db.query(sql, params)
    .then(result => {
      const [vehicle] = result.rows;
      res.status(201).json(vehicle);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
