import { TopicMaster } from '../index';

const getAllMasterTopics = async () => {
  const projection = {
    name: 1,
    category: 1,
    day: 1,
  };
  const query = {
    archive: false,
  };
  const updatedTimeDesc = [{ last_updated_at: -1 }];
  const topicList = await TopicMaster.find(query, projection, { sort: updatedTimeDesc });
  return topicList;
};

const insertMasterTopic = async (topicInfo) => {
  const newTopic = new TopicMaster({
    ...topicInfo,
    archive: false,
  });
  const result = await newTopic.save();
  return {
    _id: result._id,
    name: result.name,
    category: result.category,
    day: result.day,
  };
};

const updateMasterTopic = async (topicInfo) => {
  const updatedInfo = {
    name: topicInfo.name,
    category: topicInfo.category,
    day: topicInfo.day,
  };
  const query = {
    _id: topicInfo._id,
  };
  const result = await TopicMaster.update(query, { $set: updatedInfo });
  return result;
};

const deleteMasterTopic = async (topicId) => {
  const updatedInfo = {
    archive: true,
  };
  const query = {
    _id: topicId,
  };
  const result = await TopicMaster.update(query, { $set: updatedInfo });
  return result;
};

export { getAllMasterTopics, insertMasterTopic, updateMasterTopic, deleteMasterTopic };
