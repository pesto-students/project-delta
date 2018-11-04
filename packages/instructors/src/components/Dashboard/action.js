import differenceInDays from 'date-fns/difference_in_days';
import isFuture from 'date-fns/is_future';
import isPast from 'date-fns/is_past';

import {
  RECEIVE_DASHBOARD_BATCHES,
  REQUEST_DASHBOARD_BATCHES,
  REQUEST_REPORT_DATA,
  UPDATE_DASHBOARD_FILTER,
  RECEIVE_TOPIC_REPORT,
  RECEIVE_EXERCISE_REPORT,
} from '../../constants/Dashboard';
import { ERROR_TYPES, MSGS } from '../../constants/MSGS';
import { getBatchList } from '../../services/batch';
import { getTopicReport, getExerciseReport } from '../../services/dashboard';
import { showAlert } from '../Layout/action';

const requestDashboardBatches = () => ({
  type: REQUEST_DASHBOARD_BATCHES,
});

const receiveDashboardBatches = batchList => ({
  type: RECEIVE_DASHBOARD_BATCHES,
  batchList,
});

const requestReportData = () => ({
  type: REQUEST_REPORT_DATA,
});

const updateDashboardFilter = filter => ({
  type: UPDATE_DASHBOARD_FILTER,
  filter,
});

const receiveTopicReport = topicReport => ({
  type: RECEIVE_TOPIC_REPORT,
  topicReport,
});

const receiveExerciseReport = exerciseReport => ({
  type: RECEIVE_EXERCISE_REPORT,
  exerciseReport,
});

const fetchTopicReport = () => async (dispatch, getState) => {
  const { filter } = getState().dashboard;
  const { error, report } = await getTopicReport(filter.batch._id, filter.day);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    return;
  }
  dispatch(receiveTopicReport(report));
};

const fetchExerciseReport = () => async (dispatch, getState) => {
  const { filter } = getState().dashboard;
  const { error, report } = await getExerciseReport(filter.batch._id, filter.day);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    return;
  }
  dispatch(receiveExerciseReport(report));
};

const updateFilter = filter => async (dispatch) => {
  dispatch(updateDashboardFilter(filter));
  dispatch(requestReportData());
  dispatch(fetchTopicReport());
  dispatch(fetchExerciseReport());
};

const isActiveBatch = batch => isPast(batch.startDate) && isFuture(batch.endDate);

const initFilter = batchList => (dispatch) => {
  const filter = {
    batch: {},
    day: 0,
  };

  let activeBatch = batchList.find(isActiveBatch);

  if (activeBatch) {
    const today = new Date();
    filter.day = differenceInDays(today, activeBatch.startDate);
  } else {
    [activeBatch] = batchList;
  }

  filter.batch = activeBatch;

  dispatch(updateFilter(filter));
};

const fetchBatches = () => async (dispatch) => {
  dispatch(requestDashboardBatches());
  const { error, batchList } = await getBatchList();
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    return;
  }
  dispatch(receiveDashboardBatches(batchList));
  dispatch(initFilter(batchList));
};

export { fetchBatches, updateFilter };
