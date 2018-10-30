import isEmpty from 'validator/lib/isEmpty';

import {
  ADD_EXERCISE,
  EXERCISE_DAY_INVALID,
  EXERCISE_NAME_MISSING,
  EXERCISE_TOPIC_MISSING,
  RECEIVE_EXERCISE_DELETE,
  RECEIVE_EXERCISE_EDIT,
  RECEIVE_EXERCISES,
  RECEIVE_EXERCISES_ERROR,
  REQUEST_EXERCISE_EDIT,
  REQUEST_EXERCISES,
  REQUEST_EXERCISES_UPDATE,
} from '../../constants/Exercises';
import { ERROR_TYPES, MSGS } from '../../constants/MSGS';
import { createNewExercise, deleteExercise, getExerciseList, updateExercise } from '../../services/exercises';
import { showAlert } from '../Layout/action';

const requestExercises = () => ({
  type: REQUEST_EXERCISES,
});

const receiveExercises = exerciseList => ({
  type: RECEIVE_EXERCISES,
  exerciseList,
});

const requestExercisesUpdate = () => ({
  type: REQUEST_EXERCISES_UPDATE,
});

const receiveExercisesError = () => ({
  type: RECEIVE_EXERCISES_ERROR,
});

const addExercise = newExercise => ({
  type: ADD_EXERCISE,
  newExercise,
});

const requestExerciseEdit = exerciseId => ({
  type: REQUEST_EXERCISE_EDIT,
  exerciseId,
});

const receiveExerciseEdit = exerciseInfo => ({
  type: RECEIVE_EXERCISE_EDIT,
  exerciseInfo,
});

const receiveExerciseDelete = exerciseId => ({
  type: RECEIVE_EXERCISE_DELETE,
  exerciseId,
});

const validateExercise = (exerciseInfo) => {
  let isInfoValid = true;
  let message = '';

  if (isEmpty(exerciseInfo.name)) {
    isInfoValid = false;
    message = EXERCISE_NAME_MISSING;
  } else if (isEmpty(exerciseInfo.category)) {
    isInfoValid = false;
    message = EXERCISE_TOPIC_MISSING;
  } else if (exerciseInfo.day < 1) {
    isInfoValid = false;
    message = EXERCISE_DAY_INVALID;
  }

  return { isInfoValid, message };
};

const fetchExercises = () => async (dispatch) => {
  dispatch(requestExercises());
  const { error, exerciseList } = await getExerciseList();
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveExercisesError());
    return;
  }
  dispatch(receiveExercises(exerciseList));
};

const addNewExercise = exercise => async (dispatch) => {
  const validateInfo = validateExercise(exercise);
  if (!validateInfo.isInfoValid) {
    dispatch(showAlert(ERROR_TYPES.ERROR, validateInfo.message));
    dispatch(receiveExercisesError());
    return;
  }

  dispatch(requestExercisesUpdate());
  const { error, newExercise } = await createNewExercise(exercise);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveExercisesError());
    return;
  }
  dispatch(addExercise(newExercise));
};

const updateExerciseList = exerciseInfo => async (dispatch) => {
  const validateInfo = validateExercise(exerciseInfo);
  if (!validateInfo.isInfoValid) {
    dispatch(showAlert(ERROR_TYPES.ERROR, validateInfo.message));
    dispatch(receiveExercisesError());
    return;
  }

  dispatch(requestExercisesUpdate());
  const { error } = await updateExercise(exerciseInfo);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveExercisesError());
    return;
  }
  dispatch(receiveExerciseEdit(exerciseInfo));
};

const deleteExerciseFromList = exerciseId => async (dispatch) => {
  dispatch(requestExercisesUpdate());
  const { error } = await deleteExercise(exerciseId);
  if (error) {
    dispatch(showAlert(ERROR_TYPES.ERROR, MSGS.UNKNOWN_ERROR));
    dispatch(receiveExercisesError());
    return;
  }
  dispatch(receiveExerciseDelete(exerciseId));
};

export {
  fetchExercises,
  addNewExercise,
  requestExerciseEdit,
  updateExerciseList,
  deleteExerciseFromList,
};
