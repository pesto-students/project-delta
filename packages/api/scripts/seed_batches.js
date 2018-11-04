const mongoose = require('mongoose');

const { Batch } = require('../src/db');
const config = require('../config');

mongoose.connect(config.DB_URL, { useNewUrlParser: true });

const batchesToInsert = [
  {
    city: 'New Delhi',
    batchNumber: 1,
    numberOfDays: 30,
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    city: 'New Delhi',
    batchNumber: 2,
    numberOfDays: 30,
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    city: 'New Delhi',
    batchNumber: 3,
    numberOfDays: 30,
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    city: 'Panaji',
    batchNumber: 1,
    numberOfDays: 30,
    startDate: new Date(),
    endDate: new Date(),
  },
];

Batch.insertMany(batchesToInsert).then(() => mongoose.connection.close());
