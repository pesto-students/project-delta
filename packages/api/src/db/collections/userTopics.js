import { UserTopic } from '../index';

const insertUserTopic = async (topics) => {
  const result = await UserTopic.insertMany(topics);
  return result;
};

const getUserTopics = async (userId) => {
  const projection = {
    userId: 1,
    userFirstName: 1,
    batchTopicId: 1,
    batchTopicName: 1,
    rating: 1,
  };
  const userTopicList = await UserTopic.find({ userId }, projection);
  return userTopicList;
};

export { insertUserTopic, getUserTopics };
