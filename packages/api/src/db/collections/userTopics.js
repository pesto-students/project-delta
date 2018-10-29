import { UserTopic } from '../index';

const insertUserTopic = async (topic) => {
  const topicInfo = {
    userId: topic.userId,
    userFirstName: topic.userFirstName,
    batchTopicId: topic.batchTopicId,
    batchTopicName: topic.batchTopicName,
    rating: topic.rating,
  };
  const newUserTopic = new UserTopic(topicInfo);
  const result = await newUserTopic.save();
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
