import { UserExercise } from '../index';

const insertUserExercises = async (exercises) => {
  const result = await UserExercise.insertMany(exercises);
  return result;
};
export { insertUserExercises };
