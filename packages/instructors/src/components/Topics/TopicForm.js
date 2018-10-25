import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { InputOutlined } from '../../../../shared-components/InputOutlined';

class TopicForm extends Component {
  state = {
    name: '',
    category: '',
    day: '',
  };

  onInputChange = (event) => {
    this.setState({
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const updatedState = {
      ...this.state,
      day: Number(this.state.day),
    };
    this.props.handleSubmit(updatedState, this.clearForm);
  };

  clearForm = () => {
    this.setState({
      name: '',
      category: '',
      day: '',
    });
  };

  render() {
    const { isLoading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputOutlined
          name="name"
          type="text"
          label="Topic name"
          onChange={this.onInputChange}
          value={this.state.name}
        />
        <InputOutlined
          name="category"
          type="text"
          label="Category"
          onChange={this.onInputChange}
          value={this.state.category}
        />
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

TopicForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export { TopicForm };
