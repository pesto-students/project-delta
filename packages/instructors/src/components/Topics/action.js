import {
  RECEIVE_TOPICS,
  REQUEST_TOPICS,
  ADD_TOPIC,
  REQUEST_TOPICS_UPDATE,
  REQUEST_TOPIC_EDIT,
  RECEIVE_TOPIC_EDIT,
  RECEIVE_TOPIC_DELETE,
} from '../../constants/Topics';
import { getTopicList, createNewTopic, updateTopic, deleteTopic } from '../../services/topics';

const requestTopics = () => ({
  type: REQUEST_TOPICS,
});

const receiveTopics = topicList => ({
  type: RECEIVE_TOPICS,
  topicList,
});

const requestTopicsUpdate = () => ({
  type: REQUEST_TOPICS_UPDATE,
});

const addTopic = newTopic => ({
  type: ADD_TOPIC,
  newTopic,
});

const fetchTopics = () => async (dispatch) => {
  dispatch(requestTopics());
  const { topicList } = await getTopicList();
  dispatch(receiveTopics(topicList));
};

const addNewTopic = topic => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  const { newTopic } = await createNewTopic(topic);
  dispatch(addTopic(newTopic));
};

const requestTopicEdit = topicId => ({
  type: REQUEST_TOPIC_EDIT,
  topicId,
});

const receiveTopicEdit = topicInfo => ({
  type: RECEIVE_TOPIC_EDIT,
  topicInfo,
});

const receiveTopicDelete = topicId => ({
  type: RECEIVE_TOPIC_DELETE,
  topicId,
});

const updateTopicList = topicInfo => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  await updateTopic(topicInfo);
  dispatch(receiveTopicEdit(topicInfo));
};

const deleteTopicFromList = topicId => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  await deleteTopic(topicId);
  dispatch(receiveTopicDelete(topicId));
};

export { fetchTopics, addNewTopic, requestTopicEdit, updateTopicList, deleteTopicFromList };
