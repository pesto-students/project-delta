import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { InputOutlined } from '../../../../shared-components/InputOutlined';

class BatchForm extends Component {
  state = {
    batchId: '',
    city: '',
    numberOfDays: '',
    startDate: '',
    endDate: '',
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
      numberOfDays: Number(this.state.numberOfDays),
      startDate: new Date(this.state.startDate),
      endDate: new Date(this.state.endDate),
    };
    this.props.handleSubmit(updatedState);
  };

  render() {
    const { isLoading } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputOutlined
          name="batchId"
          type="text"
          label="Batch Id"
          onChange={this.onInputChange}
          value={this.state.batchId}
        />
        <InputOutlined
          name="city"
          type="text"
          label="City"
          onChange={this.onInputChange}
          value={this.state.city}
        />
        <InputOutlined
          name="numberOfDays"
          type="number"
          label="Number Of Days"
          onChange={this.onInputChange}
          value={this.state.numberOfDays}
        />
        <InputOutlined
          name="startDate"
          type="date"
          label="Start Date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onInputChange}
          value={this.state.startDate}
        />
        <InputOutlined
          name="endDate"
          type="date"
          label="End Date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onInputChange}
          value={this.state.endDate}
        />
        <BlockButton type="submit" className="submit-button" isLoading={isLoading}>
          Save
        </BlockButton>
      </form>
    );
  }
}

BatchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export { BatchForm };
