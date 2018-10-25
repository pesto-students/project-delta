import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { NotificationBlock } from '../../../../shared-components/NotificationBlock';
import { TopicForm } from './TopicForm';

class TopicModify extends Component {
  state = {
    errorStatus: '',
    message: '',
  }

  updateError = (errorStatus, message) => {
    this.setState({
      errorStatus,
      message,
    });
  }

  handleSubmit = (data) => {
    if (this.props.isEditAvailable) {
      this.props.updateTopicList(data);
    } else {
      this.props.addNewTopic(data);
    }
  }

  removeNotification = () => {
    this.updateError('', '');
  }

  render() {
    const { errorStatus, message } = this.state;
    const { isUpdating, isEditAvailable, editableTopic } = this.props;

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
            key={editableTopic._id}
            isLoading={isUpdating}
            handleSubmit={this.handleSubmit}
            isEditAvailable={isEditAvailable}
            editableTopic={editableTopic}
          />
        </CardContent>
      </Card>
    );
  }
}

TopicModify.propTypes = {
  isUpdating: PropTypes.bool.isRequired,
  isEditAvailable: PropTypes.bool.isRequired,
  editableTopic: PropTypes.shape().isRequired,
  addNewTopic: PropTypes.func.isRequired,
  updateTopicList: PropTypes.func.isRequired,
};

export { TopicModify };
