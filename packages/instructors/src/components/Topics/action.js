import { RECEIVE_TOPICS, REQUEST_TOPICS } from '../../constants/Topics';
import { getTopicList } from '../../services/topics';

const requestTopics = () => ({
  type: REQUEST_TOPICS,
});

const receiveTopics = topicList => ({
  type: RECEIVE_TOPICS,
  topicList,
});

const fetchTopics = () => async (dispatch) => {
  dispatch(requestTopics());
  const topicList = await getTopicList();
  dispatch(receiveTopics(topicList));
};

export { fetchTopics };
