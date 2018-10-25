import {
  RECEIVE_TOPICS,
  REQUEST_TOPICS,
  ADD_TOPIC,
  REQUEST_TOPICS_UPDATE,
} from '../../constants/Topics';
import { getTopicList, createNewTopic } from '../../services/topics';

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

export { fetchTopics, addNewTopic };
