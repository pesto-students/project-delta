import {
  ADD_BATCH,
  RECEIVE_BATCH_EDIT,
  RECEIVE_BATCH_EXERCISES,
  RECEIVE_BATCH_TOPICS,
  RECEIVE_BATCHES,
  RECEIVE_BATCHES_ERROR,
  REQUEST_BATCH_EDIT,
  REQUEST_BATCH_UPDATE,
  REQUEST_BATCHES,
  RECEIVE_BATCH_TOPICS_DELETE,
  RECEIVE_BATCH_EXERCISES_DELETE,
} from '../../constants/Batch';

const initialState = {
  isFetched: false,
  isUpdating: false,
  batchList: [],
  exerciseList: [],
  topicList: [],
  isEditAvailable: false,
  editableBatch: {},
};

export const batches = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_BATCHES:
      return {
        ...state,
        isFetched: false,
      };

    case RECEIVE_BATCHES:
      return {
        ...state,
        batchList: action.batchList,
        isFetched: true,
      };

    case RECEIVE_BATCH_EXERCISES:
      return {
        ...state,
        exerciseList: action.exerciseList,
      };

    case RECEIVE_BATCH_TOPICS:
      return {
        ...state,
        topicList: action.topicList,
      };

    case RECEIVE_BATCHES_ERROR:
      return {
        ...state,
        isUpdating: false,
        isFetched: true,
      };

    case REQUEST_BATCH_UPDATE:
      return {
        ...state,
        isUpdating: true,
      };

    case ADD_BATCH:
      return {
        ...state,
        batchList: [action.newExercise, ...state.batchList],
        editableBatch: action.newBatch,
        isUpdating: false,
      };

    case REQUEST_BATCH_EDIT:
      return {
        ...state,
        isEditAvailable: true,
        editableBatch: state.batchList.find(batch => batch._id === action.batchId),
      };

    case RECEIVE_BATCH_EDIT: {
      const { batchInfo } = action;
      const updatedList = state.batchList.map((batch) => {
        if (batch._id === batchInfo._id) {
          return batchInfo;
        }
        return batch;
      });

      return {
        ...state,
        isUpdating: false,
        batchList: updatedList,
      };
    }

    case RECEIVE_BATCH_TOPICS_DELETE:
      return {
        ...state,
        isUpdating: false,
        topicList: state.topicList.filter(topic => topic._id !== action.topicId),
      };

    case RECEIVE_BATCH_EXERCISES_DELETE:
      return {
        ...state,
        isUpdating: false,
        exerciseList: state.exerciseList.filter(exercise => exercise._id !== action.exerciseId),
      };

    default:
      return state;
  }
};
