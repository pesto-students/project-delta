import {
  REQUEST_EXERCISES,
  RECEIVE_EXERCISES,
  RECEIVE_EXERCISES_ERROR,
  REQUEST_EXERCISES_UPDATE,
  ADD_EXERCISE,
  REQUEST_EXERCISE_EDIT,
  RECEIVE_EXERCISE_EDIT,
  RECEIVE_EXERCISE_DELETE,
  RECEIVE_TOPICS,
} from '../../constants/Exercises';

const initialState = {
  isFetched: false,
  isUpdating: false,
  exerciseList: [],
  topicMaster: [],
  isEditAvailable: false,
  editableExercise: {},
};

export const exercises = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_EXERCISES:
      return {
        ...state,
        isFetched: false,
      };

    case RECEIVE_EXERCISES:
      return {
        ...state,
        exerciseList: action.exerciseList,
        isFetched: true,
      };

    case RECEIVE_TOPICS:
      return {
        ...state,
        topicMaster: action.topicList,
      };

    case REQUEST_EXERCISES_UPDATE:
      return {
        ...state,
        isUpdating: true,
      };

    case RECEIVE_EXERCISES_ERROR:
      return {
        ...state,
        isUpdating: false,
        isFetched: true,
      };

    case ADD_EXERCISE:
      return {
        ...state,
        exerciseList: [action.newExercise, ...state.exerciseList],
        editableExercise: action.newExercise,
        isUpdating: false,
      };

    case REQUEST_EXERCISE_EDIT:
      return {
        ...state,
        isEditAvailable: true,
        editableExercise: state.exerciseList.find(exercise => exercise._id === action.exerciseId),
      };

    case RECEIVE_EXERCISE_EDIT: {
      const { exerciseInfo } = action;
      const updatedList = state.exerciseList.map((exercise) => {
        if (exercise._id === exerciseInfo._id) {
          return exerciseInfo;
        }
        return exercise;
      });

      return {
        ...state,
        isUpdating: false,
        isEditAvailable: false,
        editableExercise: {},
        exerciseList: updatedList,
      };
    }

    case RECEIVE_EXERCISE_DELETE:
      return {
        ...state,
        isUpdating: false,
        exerciseList: state.exerciseList.filter(exercise => exercise._id !== action.exerciseId),
      };

    default:
      return state;
  }
};
