import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { InputOutlined } from '../../../../shared-components/InputOutlined';
import { SearchSelect } from '../../../../shared-components/SearchSelect';

class ExerciseForm extends Component {
  constructor(props) {
    super(props);

    const defaultState = {
      name: '',
      topic: '',
      day: '',
    };

    const { isEditAvailable, editableExercise } = this.props;
    if (isEditAvailable) {
      const topic = { _id: editableExercise.topicId, name: editableExercise.topicName };
      this.state = {
        name: editableExercise.name,
        topic: this.mapTopicToOption(topic),
        day: editableExercise.day,
      };
    } else {
      this.state = { ...defaultState };
    }
  }

  onInputChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const updatedState = {
      _id: this.props.editableExercise._id,
      name: this.state.name,
      topicId: this.state.topic._id,
      topicName: this.state.topic.name,
      day: Number(this.state.day),
    };
    this.props.handleSubmit(updatedState);
  };

  changeTopic = (selectedTopic) => {
    this.setState({
      topic: selectedTopic,
      day: selectedTopic.day,
    });
  }

  mapTopicToOption = topic => ({
    ...topic,
    label: topic.name,
    value: topic._id,
  });

  render() {
    const { isLoading, topicMaster } = this.props;
    const options = topicMaster.map(this.mapTopicToOption);

    return (
      <form onSubmit={this.handleSubmit}>
        <InputOutlined
          name="name"
          type="text"
          label="Exercise name"
          onChange={this.onInputChange}
          value={this.state.name}
        />
        <SearchSelect options={options} value={this.state.topic} onChange={this.changeTopic} />
        <InputOutlined
          name="day"
          type="number"
          label="Day"
          onChange={this.onInputChange}
          value={this.state.day}
        />
        <BlockButton type="submit" className="submit-button" isLoading={isLoading}>
          Save
        </BlockButton>
      </form>
    );
  }
}

ExerciseForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isEditAvailable: PropTypes.bool.isRequired,
  editableExercise: PropTypes.shape().isRequired,
  isLoading: PropTypes.bool.isRequired,
  topicMaster: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export { ExerciseForm };
