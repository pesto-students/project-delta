import React from 'react';
import PropTypes from 'prop-types';

import { Filter } from './Filter';
import { DateSlider } from '../../../../shared-components/DateSlider';

class DashboardHeader extends React.Component {
  componentDidMount() {
    const { fetchBatches } = this.props;
    fetchBatches();
  }

  getDayData = ({ numberOfDays }) => {
    let day = 0;
    const data = [];
    while (day <= numberOfDays) {
      data.push({
        value: day,
        label: `Day ${day + 1}`,
      });
      day += 1;
    }
    return data;
  }

  handleBatchChange = (event) => {
    const { updateFilter } = this.props;
    updateFilter({ batch: event.target.value });
  };

  handleDayChange = (event, day) => {
    const { updateFilter } = this.props;
    updateFilter({ day });
  };

  render() {
    const { batchList, filter } = this.props;
    const dayData = this.getDayData(filter.batch);
    return (
      <React.Fragment>
        <Filter
          batchList={batchList}
          batchId={filter.batch._id}
          handleBatchChange={this.handleBatchChange}
        />
        <DateSlider data={dayData} value={filter.day} handleChange={this.handleDayChange} />
      </React.Fragment>
    );
  }
}

DashboardHeader.propTypes = {
  fetchBatches: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  batchList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  filter: PropTypes.shape({
    batch: PropTypes.shape(),
    day: PropTypes.number,
  }).isRequired,
};

export { DashboardHeader };
