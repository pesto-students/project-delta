import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNewExercise, updateExerciseList, fetchTopics } from './action';
import { ExerciseModify } from './ExerciseModify';

const mapStateToProps = (state) => {
  const {
    isUpdating, isEditAvailable, editableExercise, topicMaster,
  } = state.exercises;
  return {
    isUpdating,
    isEditAvailable,
    editableExercise,
    topicMaster,
  };
};

const mapDispatchToProps = dispatch => ({
  addNewExercise: bindActionCreators(addNewExercise, dispatch),
  updateExerciseList: bindActionCreators(updateExerciseList, dispatch),
  fetchTopics: bindActionCreators(fetchTopics, dispatch),
});

export const ExerciseModifyContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseModify);
