import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { NotificationBlock } from '../../../../shared-components/NotificationBlock';
import { addNewTopic } from './action';
import { TopicForm } from './TopicForm';

class TopicCreate extends Component {
  state = {
    errorStatus: '',
    message: '',
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isUpdating && !this.props.isUpdating && this.clearForm !== undefined) {
      this.clearForm();
    }
  }

  updateError = (errorStatus, message) => {
    this.setState({
      errorStatus,
      message,
    });
  }

  handleSubmit = (data, clearForm) => {
    this.clearForm = clearForm;
    this.props.addNewTopic(data);
  }

  removeNotification = () => {
    this.updateError('', '');
  }

  render() {
    const { errorStatus, message } = this.state;
    const { isUpdating } = this.props;
    return (
      <Card>
        <CardHeader title="Add new topic" />
        <CardContent>
          {errorStatus === '' ?
            null :
            <NotificationBlock
              variant={errorStatus}
              message={message}
              onClose={this.removeNotification}
            />
          }
          <TopicForm
            isLoading={isUpdating}
            handleSubmit={this.handleSubmit}
          />
        </CardContent>
      </Card>
    );
  }
}

TopicCreate.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  addNewTopic: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isUpdating: state.topics.isUpdating,
});

const mapDispatchToProps = dispatch => ({
  addNewTopic: bindActionCreators(addNewTopic, dispatch),
});

export const TopicsCreateContainer = connect(mapStateToProps, mapDispatchToProps)(TopicCreate);
