import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ExerciseForm } from './ExerciseForm';

class ExerciseModify extends Component {
  componentDidMount() {
    this.props.fetchTopics();
  }

  handleSubmit = (data) => {
    if (this.props.isEditAvailable) {
      this.props.updateExerciseList(data);
    } else {
      this.props.addNewExercise(data);
    }
  };

  render() {
    const {
      isUpdating, isEditAvailable, editableExercise, topicMaster,
    } = this.props;

    return (
      <Card>
        <CardHeader title="Add new exercise" />
        <CardContent>
          <ExerciseForm
            key={editableExercise._id}
            isLoading={isUpdating}
            handleSubmit={this.handleSubmit}
            isEditAvailable={isEditAvailable}
            editableExercise={editableExercise}
            topicMaster={topicMaster}
          />
        </CardContent>
      </Card>
    );
  }
}

ExerciseModify.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  isEditAvailable: PropTypes.bool.isRequired,
  editableExercise: PropTypes.shape().isRequired,
  addNewExercise: PropTypes.func.isRequired,
  updateExerciseList: PropTypes.func.isRequired,
  topicMaster: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  fetchTopics: PropTypes.func.isRequired,
};

export { ExerciseModify };
