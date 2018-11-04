import {
  RECEIVE_DASHBOARD_BATCHES,
  RECEIVE_EXERCISE_REPORT,
  RECEIVE_TOPIC_REPORT,
  REQUEST_DASHBOARD_BATCHES,
  REQUEST_REPORT_DATA,
  UPDATE_DASHBOARD_FILTER,
} from '../../constants/Dashboard';

const initialState = {
  isBatchFetched: false,
  isReportUpdating: false,
  batchList: [],
  topicReportData: [],
  exerciseReportData: [],
  filter: {
    day: 1,
    batch: { _id: '' },
  },
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DASHBOARD_BATCHES:
      return {
        ...state,
        isBatchFetched: false,
      };

    case RECEIVE_DASHBOARD_BATCHES:
      return {
        ...state,
        isBatchFetched: true,
        batchList: action.batchList,
      };

    case REQUEST_REPORT_DATA:
      return {
        ...state,
        isReportUpdating: true,
      };

    case UPDATE_DASHBOARD_FILTER:
      return {
        ...state,
        filter: {
          ...state.filter,
          ...action.filter,
        },
      };

    case RECEIVE_TOPIC_REPORT:
      return {
        ...state,
        topicReportData: action.topicReport,
      };

    case RECEIVE_EXERCISE_REPORT:
      return {
        ...state,
        exerciseReportData: action.exerciseReport,
      };

    default:
      return state;
  }
};
