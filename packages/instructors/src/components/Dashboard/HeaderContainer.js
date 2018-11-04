import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchBatches, updateFilter } from './action';
import { DashboardHeader } from './Header';

const mapStateToProps = (state) => {
  const { filter, batchList, isBatchFetched } = state.dashboard;
  return {
    filter,
    batchList,
    isBatchFetched,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchBatches: bindActionCreators(fetchBatches, dispatch),
  updateFilter: bindActionCreators(updateFilter, dispatch),
});

export const DashboardHeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardHeader);
