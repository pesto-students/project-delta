import { Batch, TopicMaster, BatchTopic } from '../index';

const appendBatchId = (id, arrayOfObjs) => {
  const newArrayOfObjs = arrayOfObjs.map((el) => {
    const newEle = {
      name: el.name,
      category: el.category,
      day: el.day,
      batchId: id,
    };
    return newEle;
  });
  return newArrayOfObjs;
};

const getMasterTopics = async () => {
  const projection = {
    name: 1,
    category: 1,
    day: 1,
  };
  const masterTopics = await TopicMaster.find({}, projection);
  return masterTopics;
};

const getAllBatches = async () => {
  const projection = {
    city: 1,
    batchNumber: 1,
    numberOfDays: 1,
    startDate: 1,
    endDate: 1,
  };
  const startDateDesc = [{ startDate: -1 }];
  const batchList = await Batch.find({}, projection, { sort: startDateDesc });
  return batchList;
};

const insertBatch = async (batchInfo) => {
  const newBatch = new Batch(batchInfo);
  const batchCreated = await newBatch.save();
  const masterTopics = await getMasterTopics();
  const newBatchTopics = appendBatchId(batchCreated.id, masterTopics);
  const result = await BatchTopic.insertMany(newBatchTopics);
  return { batchId: batchCreated.id, batchTopicsLength: result.length };
};

export { getAllBatches, insertBatch };
