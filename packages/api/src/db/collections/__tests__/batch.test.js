import mongoose from 'mongoose';
import addDays from 'date-fns/add_days';
import { DB_URL } from '../../../../config';

import { getAllBatches, insertBatch } from '../batch';
import { Batch } from '../../index';

describe('Mongo Queries: Batch', () => {
  const dummyBatch = [
    {
      batchNumber: 'Batch #3',
      city: 'Chennai',
      numberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    },
    {
      batchNumber: 'Batch #1',
      city: 'Delhi',
      numberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    },
    {
      batchNumber: 'Batch #2',
      city: 'Mumbai',
      numberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    },
  ];

  beforeAll(async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await Batch.insertMany(dummyBatch);
  });

  afterAll(async () => {
    await Batch.deleteMany({});
    await mongoose.disconnect();
  });

  describe('getAllBatches', () => {
    it('should return all batch documents', async () => {
      const batchList = await getAllBatches();
      expect(batchList.length).toBe(dummyBatch.length);
    });

    it('should return documents in desc order of `startDate`', async () => {
      const batchList = await getAllBatches();
      const sortedBatch = dummyBatch.sort((a, b) => b.startDate - a.startDate);
      const lastIndex = sortedBatch.length - 1;

      expect(batchList[0]).toEqual(expect.objectContaining(sortedBatch[0]));
      expect(batchList[1]).toEqual(expect.objectContaining(sortedBatch[1]));
      expect(batchList[lastIndex]).toEqual(expect.objectContaining(sortedBatch[lastIndex]));
    });
  });

  describe('newBatch', () => {
    const newDocument = {
      batchNumber: 'Batch #4',
      city: 'Chennai',
      numberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    };

    afterEach(async () => {
      await Batch.deleteOne({ batchNumber: newDocument.batchNumber });
    });

    it('should insert new document', async () => {
      await insertBatch(newDocument);

      const batch = await Batch.findOne({ batchNumber: newDocument.batchNumber });
      expect(batch).toBeDefined();
    });

    it('should return new document id', async () => {
      const newId = await insertBatch(newDocument);

      const batch = await Batch.findOne({ _id: newId });
      expect(batch).toBeDefined();
    });
  });
});
