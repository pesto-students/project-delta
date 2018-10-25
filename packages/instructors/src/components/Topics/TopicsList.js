import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchTopics } from './action';

class TopicsListComponent extends React.Component {
  state = {
    options: {
      downloadOptions: { filename: 'topicsMaster.csv' },
      selectableRows: false,
    },
  }

  componentDidMount() {
    this.props.fetchTopics();
  }

  getColumns = () => {
    const columns = [{
      name: 'Name',
      options: {
        filter: false,
      },
    }, {
      name: 'Category',
    }, {
      name: 'Day',
    }];

    return columns;
  }

  formatData = topic => ([
    topic.name,
    topic.category,
    topic.day,
  ]);

  render() {
    const { options } = this.state;
    const { topicList } = this.props.topics;

    const data = topicList.map(this.formatData);
    const columns = this.getColumns();
    return (
      <MUIDataTable
        title="Topic's Master"
        options={options}
        data={data}
        columns={columns}
      />
    );
  }
}

TopicsListComponent.propTypes = {
  topics: PropTypes.shape().isRequired,
  fetchTopics: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  topics: state.topics,
});

const mapDispatchToProps = dispatch => ({
  fetchTopics: bindActionCreators(fetchTopics, dispatch),
});

export const TopicsList = connect(mapStateToProps, mapDispatchToProps)(TopicsListComponent);
