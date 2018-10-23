import { BatchTopic } from '../index';

const getBatchTopics = async (batchId, day) => {
  const projection = {
    batchId: 1,
    name: 1,
    category: 1,
    day: 1,
  };
  const batchTopicsList = await BatchTopic.find({ batchId, day }, projection);
  return batchTopicsList;
};

export { getBatchTopics };
