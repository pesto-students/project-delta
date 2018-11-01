import { BatchTopic } from '../index';

const getBatchTopics = async (batchId, day) => {
  const projection = {
    name: 1,
    category: 1,
    day: 1,
  };
  const query = {
    batchId,
    archive: false,
  };

  if (day) {
    query.day = day;
  }
  const batchTopicsList = await BatchTopic.find(query, projection);
  return batchTopicsList;
};

const deleteBatchTopic = async (topicId) => {
  const updatedInfo = {
    archive: true,
  };
  const query = {
    _id: topicId,
  };
  const opts = { runValidators: true };
  const result = await BatchTopic.update(query, { $set: updatedInfo }, opts);
  return result;
};

export { getBatchTopics, deleteBatchTopic };
