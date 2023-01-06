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

app.get('/api/vehicleData', (req, res, next) => {
  const sql = `
    select "vehicleId",
           "year",
           "make",
           "model",
           "licensePlate",
           "odometer",
           "notes"
    from "vehicle"
    order by "vehicleId"
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

app.get('/api/serviceData', (req, res, next) => {
  const sql = `
    select "serviceId",
           "serviceDate",
           "servicePerformedBy",
           "typeOfService",
           "odometerAtService",
           "cost",
           "serviceNotes",
           "year",
           "make",
           "model"
    from "service"
    join "vehicle" using ("vehicleId")
    order by "serviceId"
    `;
  db.query(sql)
    .then(result => {
      const services = result.rows;
      res.status(200).json(services);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/vehicleData/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  const sql = `
    select "vehicleId",
           "year",
           "make",
           "model",
           "licensePlate",
           "odometer",
           "notes"
    from "vehicle"
    where "vehicleId" = $1
    `;
  const params = [vehicleId];
  db.query(sql, params)
    .then(result => {
      const [vehicle] = result.rows;
      res.status(200).json(vehicle);
    })
    .catch(err => {
      next(err);
    });
});

app.post('/api/vehicleData', (req, res, next) => {
  const { year, make, model, licensePlate, odometer, notes } = req.body;
  if (!year || !make || !model || !licensePlate || !odometer || !notes) {
    throw new ClientError(400, 'Error: Year, make, model, license plate, odometer, and notes are required fields.');
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

app.post('/api/serviceData/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;
  const { serviceDate, servicePerformedBy, typeOfService, odometerAtService, cost, serviceNotes } = req.body;
  if (!serviceDate || !servicePerformedBy || !typeOfService || !odometerAtService || !cost || !serviceNotes) {
    throw new ClientError(400, 'Error: Date, service performed, type of service, odometer at service, cost, and service notes are required fields.');
  } else if (isNaN(odometerAtService) || isNaN(cost)) {
    throw new ClientError(400, 'Error: Cost and odometer must be a number, with no commas.');
  }
  const sql = `
    insert into "service" ("serviceDate", "servicePerformedBy", "typeOfService", "odometerAtService", "cost", "serviceNotes", "vehicleId")
    values ($1, $2, $3, $4, $5, $6, $7)
    returning *
    `;
  const params = [serviceDate, servicePerformedBy, typeOfService, odometerAtService, cost, serviceNotes, vehicleId];
  db.query(sql, params)
    .then(result => {
      const [service] = result.rows;
      res.status(201).json(service);
    })
    .catch(err => {
      next(err);
    });
});

app.put('/api/vehicleData/:vehicleId', (req, res, next) => {
  const { vehicleId } = req.params;

  const { year, make, model, licensePlate, odometer, notes } = req.body;
  if (!year || !make || !model || !licensePlate || !odometer || !notes) {
    throw new ClientError(400, 'Error: Year, make, model, license plate, odometer, and notes are required fields.');
  } else if (isNaN(year) || isNaN(odometer)) {
    throw new ClientError(400, 'Error: Year and odometer must be a number, with no commas.');
  }
  const sql = `
    update "vehicle"
    set "year" = $1,
        "make" = $2,
        "model" = $3,
        "licensePlate" = $4,
        "odometer" = $5,
        "notes" = $6
    where "vehicleId" = $7
    returning *
    `;
  const params = [year, make, model, licensePlate, odometer, notes, vehicleId];
  db.query(sql, params)
    .then(result => {
      const [vehicle] = result.rows;
      res.status(201).json(vehicle);
    })
    .catch(err => {
      next(err);
    });
});

app.put('/api/serviceData/:serviceId', (req, res, next) => {
  const { serviceId } = req.params;

  const { serviceDate, servicePerformedBy, typeOfService, odometerAtService, cost, serviceNotes } = req.body;
  if (!serviceDate || !servicePerformedBy || !typeOfService || !odometerAtService || !cost || !serviceNotes) {
    throw new ClientError(400, 'Error: Date, service performed, type of service, odometer at service, cost, and service notes are required fields.');
  } else if (isNaN(odometerAtService) || isNaN(cost)) {
    throw new ClientError(400, 'Error: Cost and odometer must be a number, with no commas.');
  }
  const sql = `
    update "service"
    set "serviceDate" = $1,
        "servicePerformedBy" = $2,
        "typeOfService" = $3,
        "odometerAtService" = $4,
        "cost" = $5,
        "serviceNotes" = $6
    where "serviceId" = $7
    returning *
    `;
  const params = [serviceDate, servicePerformedBy, typeOfService, odometerAtService, cost, serviceNotes, serviceId];
  db.query(sql, params)
    .then(result => {
      const [service] = result.rows;
      res.status(201).json(service);
    })
    .catch(err => {
      next(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
