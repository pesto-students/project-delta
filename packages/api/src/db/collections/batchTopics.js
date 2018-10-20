import { BatchTopic } from '../index';

const getBatchTopics = async (day) => {
  const projection = {
    name: 1,
    category: 1,
    day: 1,
  };
  if (day === undefined) {
    const batchTopics = await BatchTopic.find({}, projection);
    return batchTopics;
  }
  const batchTopics = await BatchTopic.find({ day }, projection);
  return batchTopics;
};
const insertBatchTopics = async (topics) => {
  const newBatch = new BatchTopic(topics);
  const result = await newBatch.save();
  return result.id;
};

export { getBatchTopics, insertBatchTopics };
