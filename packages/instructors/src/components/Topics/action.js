import {
  RECEIVE_TOPICS,
  REQUEST_TOPICS,
  ADD_TOPIC,
  REQUEST_TOPICS_UPDATE,
  REQUEST_TOPIC_EDIT,
  RECEIVE_TOPIC_EDIT,
  RECEIVE_TOPIC_DELETE,
  RECEIVE_TOPICS_ERROR,
} from '../../constants/Topics';
import { getTopicList, createNewTopic, updateTopic, deleteTopic } from '../../services/topics';
import { MSGS, ERROR_TYPES } from '../../constants/MSGS';
import { showAlert } from '../Layout/action';

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

const receiveTopicsError = () => ({
  type: RECEIVE_TOPICS_ERROR,
});

const addTopic = newTopic => ({
  type: ADD_TOPIC,
  newTopic,
});

const fetchTopics = () => async (dispatch) => {
  dispatch(requestTopics());
  const { error, topicList } = await getTopicList();
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveTopicsError());
    return;
  }
  dispatch(receiveTopics(topicList));
};

const addNewTopic = topic => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  const { error, newTopic } = await createNewTopic(topic);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveTopicsError());
    return;
  }
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
  const { error } = await updateTopic(topicInfo);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveTopicsError());
    return;
  }
  dispatch(receiveTopicEdit(topicInfo));
};

const deleteTopicFromList = topicId => async (dispatch) => {
  dispatch(requestTopicsUpdate());
  const { error } = await deleteTopic(topicId);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveTopicsError());
    return;
  }
  dispatch(receiveTopicDelete(topicId));
};

export { fetchTopics, addNewTopic, requestTopicEdit, updateTopicList, deleteTopicFromList };
