import {
  RECEIVE_TOPICS,
  REQUEST_TOPICS,
  ADD_TOPIC,
  REQUEST_TOPICS_UPDATE,
  REQUEST_TOPIC_EDIT,
  RECEIVE_TOPIC_EDIT,
} from '../../constants/Topics';
import { getTopicList, createNewTopic, updateTopic } from '../../services/topics';

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
  const topicList = await getTopicList();
  dispatch(receiveTopics(topicList));
};

const addNewTopic = newTopic => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  const topic = await createNewTopic(newTopic);
  dispatch(addTopic(topic));
};

const requestTopicEdit = topicId => ({
  type: REQUEST_TOPIC_EDIT,
  topicId,
});

const receiveTopicEdit = topicInfo => ({
  type: RECEIVE_TOPIC_EDIT,
  topicInfo,
});

const updateTopicList = topicInfo => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  await updateTopic(topicInfo);
  dispatch(receiveTopicEdit(topicInfo));
};

export { fetchTopics, addNewTopic, requestTopicEdit, updateTopicList };
