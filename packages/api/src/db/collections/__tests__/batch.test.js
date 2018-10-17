import mongoose from 'mongoose';
import addDays from 'date-fns/add_days';
import { DB_URL } from '../../../../config';

import { getAllBatches, insertBatch } from '../batch';
import { Batch } from '../../index';

describe('Mongo Queries: Batch', () => {
  const dummyBatch = [
    {
      city: 'Chennai',
      batchNumber: 3,
      NumberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    },
    {
      city: 'Delhi',
      batchNumber: 1,
      NumberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    },
    {
      city: 'Mumbai',
      batchNumber: 2,
      NumberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    },
  ];

  beforeAll(async () => {
    mongoose.connect(DB_URL, { useNewUrlParser: true, connectTimeoutMS: 10000 });
    await Batch.insertMany(dummyBatch);
  });

  afterAll(async () => {
    await Batch.remove({});
    await mongoose.disconnect();
  });

  describe('getAllBatches', () => {
    it('should return all batch documents', async () => {
      const batchList = await getAllBatches();
      expect(batchList.length).toBe(dummyBatch.length);
    });

    it('should return documents in desc order of `batchNumber`', async () => {
      const batchList = await getAllBatches();
      const sortedBatch = dummyBatch.sort((a, b) => b.batchNumber - a.batchNumber);
      const lastIndex = sortedBatch.length - 1;

      expect(batchList[0]).toEqual(expect.objectContaining(sortedBatch[0]));
      expect(batchList[1]).toEqual(expect.objectContaining(sortedBatch[1]));
      expect(batchList[lastIndex]).toEqual(expect.objectContaining(sortedBatch[lastIndex]));
    });
  });

  describe('newBatch', () => {
    const newDocument = {
      city: 'Chennai',
      batchNumber: 4,
      NumberOfDays: 20,
      startDate: new Date(),
      endDate: addDays(new Date(), 20),
    };

    afterEach(async () => {
      await Batch.remove({ batchNumber: newDocument.batchNumber });
    });

    it('should insert new document', async () => {
      await insertBatch(newDocument);

      const batch = Batch.findOne({ batchNumber: newDocument.batchNumber });
      expect(batch).toBeDefined();
    });

    it('should return new document id', async () => {
      const newId = await insertBatch(newDocument);

      const batch = Batch.findOne({ _id: newId });
      expect(batch).toBeDefined();
    });
  });
});
