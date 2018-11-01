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

export { getBatchTopics };
