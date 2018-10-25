import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNewTopic, updateTopicList } from './action';
import { TopicModify } from './TopicModify';

const mapStateToProps = (state) => {
  const { isUpdating, isEditAvailable, editableTopic } = state.topics;
  return {
    isUpdating,
    isEditAvailable,
    editableTopic,
  };
};

const mapDispatchToProps = dispatch => ({
  addNewTopic: bindActionCreators(addNewTopic, dispatch),
  updateTopicList: bindActionCreators(updateTopicList, dispatch),
});

export const TopicModifyContainer = connect(mapStateToProps, mapDispatchToProps)(TopicModify);
