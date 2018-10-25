// Mocking functions
// import { HTTP } from '../../../shared-utils/services/http';

export const getTopicList = () => {
  // return HTTP.GET('/instructor/batch/list');
  const dummyTopics = [
    {
      _id: 'jdhfyurj1234jhjhj34',
      name: 'Rebase',
      category: 'git',
      day: 1,
    },
    {
      _id: 'jdhfyurj1234jhjhj35',
      name: 'Merge',
      category: 'css',
      day: 2,
    },
    {
      _id: 'jdhfyurj1234jhjhj36',
      name: 'Conflict',
      category: 'git',
      day: 1,
    },
    {
      _id: 'jdhfyurj1234jhjhj37',
      name: 'ExtraTerrestrial',
      category: 'javascript',
      day: 4,
    },
  ];

  return dummyTopics;
};

export const createNewTopic = (newTopic) => {
  // return HTTP.GET('/instructor/batch/list');
  const topic = {
    _id: 'jdhfyurj1234jhjhj40',
    ...newTopic,
  };

  return topic;
};

export const updateTopic = topic => topic;

export const deleteTopic = topicId => topicId;
