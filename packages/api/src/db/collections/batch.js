import { Batch } from '../index';

const getAllBatches = async () => {
  const projection = {
    batchId: 1,
    city: 1,
    batchNumber: 1,
    numberOfDays: 1,
    startDate: 1,
    endDate: 1,
  };
  const batchNumberDesc = [{ batchNumber: -1 }];
  const batchList = await Batch.find({}, projection, { sort: batchNumberDesc });
  return batchList;
};

const insertBatch = async (batchInfo) => {
  const newBatch = new Batch(batchInfo);
  const result = await newBatch.save();
  return result.id;
};

export { getAllBatches, insertBatch };
