import {
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  RECEIVE_TOPICS_UPDATE,
  REQUEST_TOPICS_UPDATE,
  ADD_TOPIC,
} from '../../constants/Topics';

const initialState = {
  isFetched: false,
  isUpdating: false,
  topicList: [],
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

    case RECEIVE_TOPICS_UPDATE:
      return {
        ...state,
        topicList: action.topicList,
        isUpdating: false,
      };

    case ADD_TOPIC:
      return {
        ...state,
        topicList: [action.newTopic, ...state.topicList],
        isUpdating: false,
      };

    default:
      return state;
  }
};
