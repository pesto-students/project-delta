import mongoose from 'mongoose';
import request from 'request-promise-native';
import addDays from 'date-fns/add_days';
import app from '../src';
import { PORT, DB_URL } from '../config';
import { Batch } from '../src/db';

let savedBatches;
const dummyBatches = [
  {
    city: 'Delhi',
    batchId: 'DL02',
    batchNumber: 20001,
    numberOfDays: 20,
    startDate: new Date(),
    endDate: addDays(new Date(), 20),
  },
  {
    city: 'Delhi',
    batchId: 'DL03',
    batchNumber: 20002,
    numberOfDays: 20,
    startDate: new Date(),
    endDate: addDays(new Date(), 20),
  },
  {
    city: 'InactiveCity',
    batchId: 'IC012',
    batchNumber: 201,
    numberOfDays: 20,
    startDate: new Date(2011, 0, 12), // 12-Jan-2011
    endDate: addDays(new Date(2011, 0, 12), 20),
  },
];

let server;
const serverUrl = `http://localhost:${PORT}`;

beforeAll((done) => {
  jest.setTimeout(10000);
  mongoose.connect(DB_URL, { useNewUrlParser: true }, () => {
    server = app.listen(PORT, () => {
      Batch.find({})
        .then((batch) => {
          savedBatches = batch;
          return Promise.resolve(true);
        })
        .then(() => Batch.deleteMany({}))
        .then(() => Batch.insertMany(dummyBatches))
        .then(() => done());
    });
  });
});

afterAll((done) => {
  Batch.deleteMany({})
    .then(() => Batch.insertMany(savedBatches))
    .then(() => mongoose.connection.close())
    .then(() => server.close(done));
});

describe('GET: /instructor/batch/list', () => {
  const url = `${serverUrl}/instructor/batch/list`;

  it('should send batchList as an array', async () => {
    const res = await request({
      url,
      method: 'GET',
      headers: { origin: 'http://localhost' },
      json: true,
    });

    const expected = { batchList: expect.any(Array) };

    expect(res).toEqual(expect.objectContaining(expected));
  });

  it('should filter the list of active batches only', async () => {
    const res = await request({
      url,
      qs: { filter: 'active' },
      method: 'GET',
      headers: { origin: 'http://localhost' },
      json: true,
    });
    expect(res.activeBatches.length).toBe(2);
  });
});

describe('POST: /instructor/batch/create', () => {
  const url = `${serverUrl}/instructor/batch/create`;
  const testBatch = {
    city: 'New York',
    batchId: 'NY012',
    batchNumber: 2021,
    numberOfDays: 28,
    startDate: new Date(),
    endDate: addDays(new Date(), 28),
  };

  it('should add new  batch in the database', async () => {
    const res = await request({
      url,
      method: 'POST',
      headers: { origin: 'http://localhost' },
      body: testBatch,
      json: true,
    });
    expect(res.batch_created).toBe('Success');
  });

  it('should not add new batch when some contraint on DB fails', async () => {
    try {
      await request({
        url,
        method: 'POST',
        headers: { origin: 'http://localhost' },
        body: testBatch,
        json: true,
      });
    } catch (e) {
      expect(e.statusCode).toBe(500);
    }
  });
});
