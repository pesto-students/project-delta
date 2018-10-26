import { HTTP } from '../../../shared-utils/services/http';

export const getTopicList = () => HTTP.GET('/instructor/topicMaster');

export const createNewTopic = newTopic => HTTP.POST('/instructor/topicMaster/create', { data: newTopic });

export const updateTopic = ({ _id, ...data }) => HTTP.PUT(`/instructor/topicMaster/${_id}`, { data });

export const deleteTopic = topicId => HTTP.DELETE(`/instructor/topicMaster/${topicId}`);
