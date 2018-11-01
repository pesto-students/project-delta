import { HTTP } from '../../../shared-utils/services/http';

export const creatNewBatch = batchInfo => HTTP.POST('/instructor/batch/create', { ...batchInfo });

export const getBatchList = () => HTTP.GET('/instructor/batch/list');

export const updateBatch = ({ _id, ...data }) => HTTP.PUT(`/instructor/batch/${_id}`, { data });

export const getBatchTopicList = batchId => HTTP.GET('/batchTopics/list', { batchId });

export const getBatchExerciseList = batchId => HTTP.GET('/batchExercise/list', { batchId });
