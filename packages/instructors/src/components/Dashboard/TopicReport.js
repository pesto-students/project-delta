import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const formatTopicData = (topicReportData) => {
  const { topicName } = topicReportData._id;
  return {
    topicName,
    usersCount: topicReportData.users.length,
    users: topicReportData.users,
    averageRating: topicReportData.averageRating,
  };
};

const TopicReport = ({ chartData }) => (
  <Card style={{ marginBottom: '16px' }}>
    <CardHeader
      title="Topic Report"
    />
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="topicName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="averageRating" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

TopicReport.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => {
  const { topicReportData } = state.dashboard;
  return {
    chartData: topicReportData.map(formatTopicData),
  };
};

export const TopicReportContainer = connect(mapStateToProps)(TopicReport);
