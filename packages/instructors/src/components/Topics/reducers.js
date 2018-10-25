import {
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
} from '../../constants/Topics';

const initialState = {
  isFetched: false,
  topicList: [],
};

export const topics = (state = initialState, action) => {
  const { topicList, type } = action;
  switch (type) {
    case REQUEST_TOPICS:
      return {
        ...state,
        isFetched: false,
      };

    case RECEIVE_TOPICS:
      return {
        ...state,
        topicList,
        isFetched: true,
      };

    default:
      return state;
  }
};
