import PropTypes from 'prop-types';
import React, { Component } from 'react';
import format from 'date-fns/format';

import { BlockButton } from '../../../../shared-components/BlockButton';
import { InputOutlined } from '../../../../shared-components/InputOutlined';

class BatchForm extends Component {
  constructor(props) {
    super(props);

    const defaultState = {
      batchNumber: '',
      city: '',
      numberOfDays: '',
      startDate: '',
      endDate: '',
    };

    const { isEditAvailable, editableBatch } = this.props;
    if (isEditAvailable) {
      this.state = {
        ...editableBatch,
        startDate: format(editableBatch.startDate, 'YYYY-MM-DD'),
        endDate: format(editableBatch.endDate, 'YYYY-MM-DD'),
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
    const { state } = this;
    const updatedState = {
      ...state,
      numberOfDays: Number(state.numberOfDays),
      startDate: new Date(state.startDate),
      endDate: new Date(state.endDate),
    };
    const { handleSubmit } = this.props;
    handleSubmit(updatedState);
  };

  render() {
    const { isLoading, isDisabled } = this.props;
    const {
      batchNumber, city, numberOfDays, startDate, endDate,
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputOutlined
          name="batchNumber"
          type="text"
          label="Batch Number"
          onChange={this.onInputChange}
          value={batchNumber}
          disabled={isDisabled}
        />
        <InputOutlined
          name="city"
          type="text"
          label="City"
          onChange={this.onInputChange}
          value={city}
          disabled={isDisabled}
        />
        <InputOutlined
          name="numberOfDays"
          type="number"
          label="Number Of Days"
          onChange={this.onInputChange}
          value={numberOfDays}
          disabled={isDisabled}
        />
        <InputOutlined
          name="startDate"
          type="date"
          label="Start Date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onInputChange}
          value={startDate}
          disabled={isDisabled}
        />
        <InputOutlined
          name="endDate"
          type="date"
          label="End Date"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={this.onInputChange}
          value={endDate}
          disabled={isDisabled}
        />
        <BlockButton
          type="submit"
          className="submit-button"
          isLoading={isLoading}
          disabled={isDisabled}
        >
          Save
        </BlockButton>
      </form>
    );
  }
}

BatchForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isEditAvailable: PropTypes.bool,
  editableBatch: PropTypes.shape(),
  isDisabled: PropTypes.bool,
};

BatchForm.defaultProps = {
  isDisabled: false,
  isEditAvailable: false,
  editableBatch: {},
};

export { BatchForm };
