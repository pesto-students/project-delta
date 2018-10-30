import { HTTP } from '../../../shared-utils/services/http';

export const getExerciseList = () => HTTP.GET('/instructor/exerciseMaster');

export const createNewExercise = newExercise => HTTP.POST('/instructor/exerciseMaster/create', { data: newExercise });

export const updateExercise = ({ _id, ...data }) => HTTP.PUT(`/instructor/exerciseMaster/${_id}`, { data });

export const deleteExercise = exerciseId => HTTP.DELETE(`/instructor/exerciseMaster/${exerciseId}`);
