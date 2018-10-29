import {
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  RECEIVE_TOPICS_ERROR,
  REQUEST_TOPICS_UPDATE,
  ADD_TOPIC,
  REQUEST_TOPIC_EDIT,
  RECEIVE_TOPIC_EDIT,
  RECEIVE_TOPIC_DELETE,
} from '../../constants/Topics';

const initialState = {
  isFetched: false,
  isUpdating: false,
  topicList: [],
  isEditAvailable: false,
  editableTopic: {},
};

export const topics = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_TOPICS:
      return {
        ...state,
        isFetched: false,
      };

    case RECEIVE_TOPICS:
      return {
        ...state,
        topicList: action.topicList,
        isFetched: true,
      };

    case REQUEST_TOPICS_UPDATE:
      return {
        ...state,
        isUpdating: true,
      };

    case RECEIVE_TOPICS_ERROR:
      return {
        ...state,
        isUpdating: false,
        isFetched: true,
      };

    case ADD_TOPIC:
      return {
        ...state,
        topicList: [action.newTopic, ...state.topicList],
        editableTopic: action.newTopic,
        isUpdating: false,
      };

    case REQUEST_TOPIC_EDIT:
      return {
        ...state,
        isEditAvailable: true,
        editableTopic: state.topicList.find(topic => topic._id === action.topicId),
      };

    case RECEIVE_TOPIC_EDIT: {
      const { topicInfo } = action;
      const updatedList = state.topicList.map((topic) => {
        if (topic._id === topicInfo._id) {
          return topicInfo;
        }
        return topic;
      });

      return {
        ...state,
        isUpdating: false,
        isEditAvailable: false,
        editableTopic: {},
        topicList: updatedList,
      };
    }

    case RECEIVE_TOPIC_DELETE:
      return {
        ...state,
        isUpdating: false,
        topicList: state.topicList.filter(topic => topic._id !== action.topicId),
      };

    default:
      return state;
  }
};
