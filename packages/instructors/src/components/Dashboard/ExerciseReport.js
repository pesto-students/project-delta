import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const formatExerciseData = (topicReportData) => {
  const { exerciseName } = topicReportData._id;
  return {
    exerciseName,
    usersCount: topicReportData.users.length,
    users: topicReportData.users,
    completedCount: topicReportData.completedCount,
  };
};

const ExerciseReport = ({ chartData }) => (
  <Card>
    <CardHeader
      title="Exercise Report"
    />
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="exerciseName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="completedCount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

ExerciseReport.propTypes = {
  chartData: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => {
  const { exerciseReportData } = state.dashboard;
  return {
    chartData: exerciseReportData.map(formatExerciseData),
  };
};

export const ExerciseReportContainer = connect(mapStateToProps)(ExerciseReport);
