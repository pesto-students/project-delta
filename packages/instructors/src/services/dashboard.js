import { HTTP } from '../../../shared-utils/services/http';

export const getTopicReport = (batchId, day) => HTTP.GET('/userTopic/report', { batchId, day });

export const getExerciseReport = (batchId, day) => HTTP.GET('/userExercise/report', { batchId, day });
