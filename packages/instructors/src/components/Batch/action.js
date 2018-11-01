import {
  RECEIVE_BATCH_EDIT,
  RECEIVE_BATCHES,
  RECEIVE_BATCHES_ERROR,
  REQUEST_BATCH_EDIT,
  REQUEST_BATCH_UPDATE,
  REQUEST_BATCHES,
  RECEIVE_BATCH_TOPICS,
  RECEIVE_BATCH_EXERCISES,
} from '../../constants/Batch';
import { ERROR_TYPES, MSGS } from '../../constants/MSGS';
import {
  getBatchList,
  updateBatch,
  getBatchTopicList,
  getBatchExerciseList,
} from '../../services/batch';
import { showAlert } from '../Layout/action';
import { validateBatchInfo } from './validateBatch';

const requestBatches = () => ({
  type: REQUEST_BATCHES,
});

const receiveBatches = batchList => ({
  type: RECEIVE_BATCHES,
  batchList,
});

const receiveBatchesError = () => ({
  type: RECEIVE_BATCHES_ERROR,
});

const requestBatchEdit = batchId => ({
  type: REQUEST_BATCH_EDIT,
  batchId,
});

const requestBatchUpdate = () => ({
  type: REQUEST_BATCH_UPDATE,
});

const receiveBatchEdit = batchInfo => ({
  type: RECEIVE_BATCH_EDIT,
  batchInfo,
});

const receiveBatchTopics = topicList => ({
  type: RECEIVE_BATCH_TOPICS,
  topicList,
});

const receiveBatchExercises = exerciseList => ({
  type: RECEIVE_BATCH_EXERCISES,
  exerciseList,
});

const fetchBatches = () => async (dispatch) => {
  dispatch(requestBatches());
  const { error, batchList } = await getBatchList();
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveBatchesError());
    return;
  }
  dispatch(receiveBatches(batchList));
};

const fetchBatchTopics = batchId => async (dispatch) => {
  const { error, batchTopicsList } = await getBatchTopicList(batchId);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveBatchesError());
    return;
  }
  dispatch(receiveBatchTopics(batchTopicsList));
};

const fetchBatchExercises = batchId => async (dispatch) => {
  const { error, exerciseList } = await getBatchExerciseList(batchId);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveBatchesError());
    return;
  }
  dispatch(receiveBatchExercises(exerciseList));
};

const editBatch = batchId => async (dispatch, getState) => {
  const { batches } = getState();
  if (batches.batchList.length === 0) {
    await dispatch(fetchBatches());
  }

  await dispatch(fetchBatchTopics(batchId));
  await dispatch(fetchBatchExercises(batchId));

  dispatch(requestBatchEdit(batchId));
};

const updateBatchList = batchInfo => async (dispatch) => {
  const validateInfo = validateBatchInfo(batchInfo);
  if (!validateInfo.isInfoValid) {
    dispatch(showAlert(ERROR_TYPES.ERROR, validateInfo.message));
    dispatch(receiveBatchesError());
    return;
  }

  dispatch(requestBatchUpdate());
  const { error } = await updateBatch(batchInfo);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveBatchesError());
    return;
  }
  dispatch(receiveBatchEdit(batchInfo));
};

export { fetchBatches, editBatch, updateBatchList };
