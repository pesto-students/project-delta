import { UserTopic } from '../index';

const insertUserTopic = async (topic) => {
  const topicInfo = { 
    userId: topic.userId,
    userFirstName: topic.userFirstName,
    batchTopicId: topic.batchTopicId,
    batchTopicName: topic.batchTopicName,
    rating: topic.rating
  };
  const newUserTopic = new UserTopic(topicInfo);
  const result = await newUserTopic.save();
  return result;
};

export { insertUserTopic };
