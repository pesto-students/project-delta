import isEmpty from 'validator/lib/isEmpty';

import { ERROR_TYPES, MSGS } from '../../constants/MSGS';
import {
  ADD_TOPIC,
  DAY_INVALID,
  RECEIVE_TOPIC_DELETE,
  RECEIVE_TOPIC_EDIT,
  RECEIVE_TOPICS,
  RECEIVE_TOPICS_ERROR,
  REQUEST_TOPIC_EDIT,
  REQUEST_TOPICS,
  REQUEST_TOPICS_UPDATE,
  TOPIC_CATEGORY_MISSING,
  TOPIC_NAME_MISSING,
} from '../../constants/Topics';
import { createNewTopic, deleteTopic, getTopicList, updateTopic } from '../../services/topics';
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

const validateTopic = (topicInfo) => {
  let isInfoValid = true;
  let message = '';

  if (isEmpty(topicInfo.name)) {
    isInfoValid = false;
    message = TOPIC_NAME_MISSING;
  } else if (isEmpty(topicInfo.category)) {
    isInfoValid = false;
    message = TOPIC_CATEGORY_MISSING;
  } else if (topicInfo.day < 1) {
    isInfoValid = false;
    message = DAY_INVALID;
  }

  return { isInfoValid, message };
};

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
  const validateInfo = validateTopic(topic);
  if (!validateInfo.isInfoValid) {
    dispatch(showAlert(ERROR_TYPES.ERROR, validateInfo.message));
    dispatch(receiveTopicsError());
    return;
  }

  dispatch(requestTopicsUpdate());
  const { error, newTopic } = await createNewTopic(topic);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveTopicsError());
    return;
  }
  dispatch(addTopic(newTopic));
};

const updateTopicList = topicInfo => async (dispatch) => {
  const validateInfo = validateTopic(topicInfo);
  if (!validateInfo.isInfoValid) {
    dispatch(showAlert(ERROR_TYPES.ERROR, validateInfo.message));
    dispatch(receiveTopicsError());
    return;
  }

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
